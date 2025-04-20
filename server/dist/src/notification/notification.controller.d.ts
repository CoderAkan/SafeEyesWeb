import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    create(createNotificationDto: CreateNotificationDto): Promise<{
        message: string;
        id: number;
        timestamp: Date;
        type: string;
        read_status: boolean;
    }>;
    findAll(req: any): Promise<{
        message: string;
        id: number;
        timestamp: Date;
        type: string;
        read_status: boolean;
    }[]>;
    findOne(id: string): Promise<{
        message: string;
        id: number;
        timestamp: Date;
        type: string;
        read_status: boolean;
    }>;
    update(id: string, updateNotificationDto: UpdateNotificationDto): Promise<{
        message: string;
        id: number;
        timestamp: Date;
        type: string;
        read_status: boolean;
    }>;
    remove(id: string): Promise<{
        message: string;
        id: number;
        timestamp: Date;
        type: string;
        read_status: boolean;
    }>;
}
