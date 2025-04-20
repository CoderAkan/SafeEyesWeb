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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let NotificationService = class NotificationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createNotificationDto) {
        return await this.prisma.notification.create({
            data: {
                message: createNotificationDto.message,
                read_status: createNotificationDto.read_status,
                timestamp: createNotificationDto.timestamp,
                type: createNotificationDto.type,
                recipients: {
                    create: createNotificationDto.recipients.map(userId => ({ userId })),
                },
            },
        });
    }
    async findAll(userId) {
        return await this.prisma.notification.findMany({
            where: {
                recipients: {
                    some: { userId: userId },
                },
            },
        });
    }
    async findOne(id) {
        const notification = await this.prisma.notification.findUnique({
            where: { id },
        });
        if (!notification) {
            throw new common_1.NotFoundException(`Notification with ID ${id} not found.`);
        }
        return notification;
    }
    async update(id, updateNotificationDto) {
        const notification = await this.prisma.notification.findUnique({ where: { id } });
        if (!notification)
            throw new common_1.NotFoundException('Notification not found!');
        const data = {};
        if (updateNotificationDto.message) {
            data.message = updateNotificationDto.message;
        }
        if (updateNotificationDto.read_status) {
            data.read_status = updateNotificationDto.read_status;
        }
        if (updateNotificationDto.timestamp) {
            data.timestamp = updateNotificationDto.timestamp;
        }
        if (updateNotificationDto.type) {
            data.type = updateNotificationDto.type;
        }
        if (updateNotificationDto.recipients) {
            data.recipients = {
                connect: updateNotificationDto.recipients.map(userId => ({ userId_notificationId: { userId, notificationId: id } })),
            };
        }
        return await this.prisma.notification.update({
            where: {
                id: id,
            },
            data: data,
        });
    }
    async remove(id) {
        const notification = await this.prisma.notification.findUnique({ where: { id } });
        if (!notification)
            throw new common_1.NotFoundException('Notification not found!');
        await this.prisma.userNotification.deleteMany({
            where: { notificationId: id },
        });
        return await this.prisma.notification.delete({ where: { id } });
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map