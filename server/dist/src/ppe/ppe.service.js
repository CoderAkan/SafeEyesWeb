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
exports.PpeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PpeService = class PpeService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPpeDto, userId) {
        const ppe = await this.prisma.pPE.findMany({
            where: {
                assigned_to_user_id: userId,
                type: createPpeDto.type,
            }
        });
        if (ppe.length)
            throw new common_1.BadRequestException('This worker already has this item');
        return await this.prisma.pPE.create({
            data: {
                type: createPpeDto.type,
                status: createPpeDto.status,
                last_inspection_date: createPpeDto.last_inspection_date,
                assigned_to_user_id: userId,
                id: createPpeDto.id,
            },
        });
    }
    async findAll(id) {
        return await this.prisma.pPE.findMany({
            where: {
                assigned_to_user: { id },
            },
        });
    }
    async findOne(ppeId) {
        if (ppeId == undefined) {
            throw new common_1.BadRequestException("Your id is undefined");
        }
        return await this.prisma.pPE.findUnique({ where: { id: ppeId } });
    }
    async update(id, updatePpeDto, userId) {
        const ppe = await this.prisma.pPE.findUnique({ where: { id } });
        if (!ppe)
            throw new common_1.NotFoundException('PPE not found!');
        const data = {};
        if (updatePpeDto.type) {
            data.type = updatePpeDto.type;
        }
        if (updatePpeDto.status) {
            data.status = updatePpeDto.status;
        }
        if (updatePpeDto.last_inspection_date) {
            data.last_inspection_date = updatePpeDto.last_inspection_date;
        }
        return await this.prisma.pPE.update({
            where: {
                id: id,
            },
            data: data,
        });
    }
    async remove(id) {
        const ppe = await this.prisma.pPE.findUnique({ where: { id } });
        if (!ppe)
            throw new common_1.NotFoundException('PPE not found!');
        return await this.prisma.pPE.delete({
            where: {
                id: id,
            }
        });
    }
};
exports.PpeService = PpeService;
exports.PpeService = PpeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PpeService);
//# sourceMappingURL=ppe.service.js.map