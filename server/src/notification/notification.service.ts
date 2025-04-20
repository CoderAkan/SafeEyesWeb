import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class NotificationService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
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

  async findAll(userId: number) {
    return await this.prisma.notification.findMany({
      where: {
        recipients: {
          some: { userId: userId },  
        },
      },
    });
  }

  async findOne(id: number) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) {
        throw new NotFoundException(`Notification with ID ${id} not found.`);
    }

    return notification;
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    const notification = await this.prisma.notification.findUnique({ where: { id } });
    if (!notification) throw new NotFoundException('Notification not found!');

    const data: Prisma.NotificationUpdateInput = {};
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

  async remove(id: number) {
    const notification = await this.prisma.notification.findUnique({ where: { id } });
    if (!notification) throw new NotFoundException('Notification not found!');

    await this.prisma.userNotification.deleteMany({
      where: { notificationId: id },
    });

    return await this.prisma.notification.delete({where: {id}});
  }
}
