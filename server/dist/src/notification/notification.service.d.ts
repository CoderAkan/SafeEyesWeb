import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'prisma/prisma.service';
export declare class NotificationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createNotificationDto: CreateNotificationDto): Promise<{
        message: string;
        id: number;
        timestamp: Date;
        type: string;
        read_status: boolean;
    }>;
    findAll(userId: number): Promise<{
        message: string;
        id: number;
        timestamp: Date;
        type: string;
        read_status: boolean;
    }[]>;
    findOne(id: number): Promise<{
        message: string;
        id: number;
        timestamp: Date;
        type: string;
        read_status: boolean;
    }>;
    update(id: number, updateNotificationDto: UpdateNotificationDto): Promise<{
        message: string;
        id: number;
        timestamp: Date;
        type: string;
        read_status: boolean;
    }>;
    remove(id: number): Promise<{
        message: string;
        id: number;
        timestamp: Date;
        type: string;
        read_status: boolean;
    }>;
}
