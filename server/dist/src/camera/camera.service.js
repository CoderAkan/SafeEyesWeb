"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CameraService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CameraService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const child_process_1 = require("child_process");
const events_1 = require("events");
let CameraService = CameraService_1 = class CameraService extends events_1.EventEmitter {
    constructor(prisma) {
        super();
        this.prisma = prisma;
        this.logger = new common_1.Logger(CameraService_1.name);
        this.activeStreams = new Map();
    }
    async create(createCameraDto, userId) {
        return await this.prisma.camera.create({
            data: {
                location: createCameraDto.location,
                status: createCameraDto.status,
                resolution: createCameraDto.resolution,
                last_maintenance: createCameraDto.last_maintenance,
                rtsp_address: createCameraDto.rtsp_address,
                responsible_person: {
                    connect: { id: userId },
                },
            },
        });
    }
    async findAll(userId) {
        console.log('Camera service - userId received:', userId);
        console.log('Camera service - userId type:', typeof userId);
        console.log('Camera service - userId is NaN:', isNaN(userId));
        if (!userId || isNaN(userId)) {
            throw new common_1.BadRequestException(`Valid User ID is required. Received: ${userId}`);
        }
        return await this.prisma.camera.findMany({
            where: {
                responsible_person_id: userId,
            },
            include: {
                responsible_person: true,
            },
        });
    }
    async findOne(id) {
        return await this.prisma.camera.findUnique({
            where: { id }
        });
    }
    async update(id, updateCameraDto) {
        const camera = await this.prisma.camera.findUnique({ where: { id } });
        if (!camera)
            throw new common_1.NotFoundException('Camera not found!');
        const data = {};
        if (updateCameraDto.resolution) {
            data.resolution = updateCameraDto.resolution;
        }
        if (updateCameraDto.status) {
            data.status = updateCameraDto.status;
        }
        if (updateCameraDto.location) {
            data.location = updateCameraDto.location;
        }
        if (updateCameraDto.last_maintenance) {
            data.last_maintenance = updateCameraDto.last_maintenance;
        }
        if (updateCameraDto.rtsp_address) {
            data.rtsp_address = updateCameraDto.rtsp_address;
        }
        return await this.prisma.camera.update({
            where: {
                id: id,
            },
            data: data,
        });
    }
    async remove(id) {
        const camera = await this.prisma.camera.findUnique({ where: { id } });
        if (!camera)
            throw new common_1.NotFoundException('Camera not found!');
        this.stopCameraStream(id);
        return await this.prisma.camera.delete({ where: { id } });
    }
    async startCameraStream(cameraId, userId) {
        const camera = await this.prisma.camera.findFirst({
            where: {
                id: cameraId,
                responsible_person_id: userId,
            },
        });
        if (!camera) {
            throw new common_1.NotFoundException('Camera not found or access denied');
        }
        if (this.activeStreams.has(cameraId)) {
            this.logger.warn(`Camera ${cameraId} stream is already running`);
            return;
        }
        let ffmpegArgs;
        if (camera.rtsp_address) {
            ffmpegArgs = [
                '-rtsp_transport', 'tcp',
                '-i', camera.rtsp_address,
                '-vf', 'scale=640:480',
                '-r', '30',
                '-f', 'mjpeg',
                '-q:v', '5',
                'pipe:1'
            ];
        }
        else {
            ffmpegArgs = [
                '-f', 'v4l2',
                '-i', `/dev/video${cameraId}`,
                '-vf', 'scale=640:480',
                '-r', '30',
                '-f', 'mjpeg',
                '-q:v', '5',
                'pipe:1'
            ];
        }
        const ffmpegProcess = (0, child_process_1.spawn)('ffmpeg', ffmpegArgs);
        this.activeStreams.set(cameraId, ffmpegProcess);
        ffmpegProcess.stdout.on('data', (data) => {
            this.emit('frame', { cameraId, frameBuffer: data });
        });
        ffmpegProcess.stderr.on('data', (data) => {
            this.logger.debug(`FFmpeg stderr for camera ${cameraId}: ${data.toString()}`);
        });
        ffmpegProcess.on('close', (code) => {
            this.logger.log(`FFmpeg process for camera ${cameraId} closed with code ${code}`);
            this.activeStreams.delete(cameraId);
        });
        ffmpegProcess.on('error', (error) => {
            this.logger.error(`FFmpeg error for camera ${cameraId}: ${error.message}`);
            this.activeStreams.delete(cameraId);
        });
        await this.prisma.camera.update({
            where: { id: cameraId },
            data: { status: 'streaming' },
        });
        this.logger.log(`Camera ${cameraId} stream started`);
    }
    stopCameraStream(cameraId) {
        const ffmpegProcess = this.activeStreams.get(cameraId);
        if (ffmpegProcess) {
            ffmpegProcess.kill('SIGTERM');
            this.activeStreams.delete(cameraId);
            this.logger.log(`Camera ${cameraId} stream stopped`);
            this.prisma.camera.update({
                where: { id: cameraId },
                data: { status: 'offline' },
            }).catch(error => {
                this.logger.error(`Failed to update camera ${cameraId} status: ${error.message}`);
            });
        }
    }
    getCameraStreamingStatus(cameraId) {
        return this.activeStreams.has(cameraId);
    }
    getActiveStreams() {
        return Array.from(this.activeStreams.keys());
    }
    async processFrameForAI(cameraId, frameBuffer) {
        const camera = await this.prisma.camera.findUnique({ where: { id: cameraId } });
        const mockResult = {
            cameraId,
            location: camera?.location,
            timestamp: new Date().toISOString(),
            detections: [
                {
                    type: 'person',
                    confidence: 0.95,
                    bbox: [100, 100, 200, 300],
                    danger_level: 'low'
                }
            ],
            is_dangerous: Math.random() > 0.9
        };
        return mockResult;
    }
    async cleanup() {
        const activeStreamIds = Array.from(this.activeStreams.keys());
        for (const cameraId of activeStreamIds) {
            this.stopCameraStream(cameraId);
        }
        this.logger.log('All camera streams stopped');
    }
};
exports.CameraService = CameraService;
exports.CameraService = CameraService = CameraService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CameraService);
//# sourceMappingURL=camera.service.js.map