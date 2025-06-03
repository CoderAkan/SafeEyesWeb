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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CameraService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CameraService = class CameraService {
    constructor(prisma) {
        this.prisma = prisma;
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
        return await this.prisma.camera.delete({ where: { id } });
    }
};
exports.CameraService = CameraService;
exports.CameraService = CameraService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CameraService);
//# sourceMappingURL=camera.service.js.map