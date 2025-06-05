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
exports.IncidentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let IncidentService = class IncidentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createIncidentDto) {
        const data = {
            timestamp: new Date(),
            type: createIncidentDto.type,
            severity: createIncidentDto.severity,
            status: createIncidentDto.status,
            detected_by_camera_id: createIncidentDto.detected_by_camera_id,
        };
        if (createIncidentDto.worker_id) {
            data.worker_id = createIncidentDto.worker_id;
        }
        return await this.prisma.incident.create({
            data,
            include: {
                detected_by_camera: true,
                worker: true,
            }
        });
    }
    async findAll(userId, userRole, filters) {
        const where = {};
        if (filters.fromDate || filters.toDate) {
            where.timestamp = {};
            if (filters.fromDate)
                where.timestamp.gte = new Date(filters.fromDate);
            if (filters.toDate)
                where.timestamp.lte = new Date(filters.toDate);
        }
        if (filters.severity)
            where.severity = filters.severity;
        if (filters.status)
            where.status = filters.status;
        if (filters.workerIds?.length)
            where.worker_id = { in: filters.workerIds };
        if (filters.type)
            where.type = filters.type;
        return await this.prisma.incident.findMany({
            where,
            include: {
                detected_by_camera: true,
                worker: true,
            },
        });
    }
    async findOne(id) {
        return await this.prisma.incident.findUnique({
            where: { id },
            include: {
                detected_by_camera: true,
                worker: true,
            }
        });
    }
    async update(id, updateIncidentDto) {
        const inc = await this.prisma.incident.findUnique({ where: { id } });
        if (!inc)
            throw new common_1.NotFoundException('Incident not found!');
        const data = {};
        if (updateIncidentDto.severity) {
            data.severity = updateIncidentDto.severity;
        }
        if (updateIncidentDto.status) {
            data.status = updateIncidentDto.status;
        }
        if (updateIncidentDto.type) {
            data.type = updateIncidentDto.type;
        }
        if (updateIncidentDto.timestamp) {
            data.timestamp = updateIncidentDto.timestamp;
        }
        if (updateIncidentDto.detected_by_camera_id) {
            data.detected_by_camera = {
                connect: { id: updateIncidentDto.detected_by_camera_id },
            };
        }
        if (updateIncidentDto.worker_id) {
            data.worker = {
                connect: { id: updateIncidentDto.worker_id },
            };
        }
        return await this.prisma.incident.update({
            where: {
                id: id,
            },
            data: data,
        });
    }
    async remove(id) {
        const inc = await this.prisma.incident.findUnique({ where: { id } });
        if (!inc)
            throw new common_1.NotFoundException('Incident not found!');
        return await this.prisma.incident.delete({
            where: {
                id: id,
            }
        });
    }
};
exports.IncidentService = IncidentService;
exports.IncidentService = IncidentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], IncidentService);
//# sourceMappingURL=incident.service.js.map