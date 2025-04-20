import { CreateCameraDto } from './dto/create-camera.dto';
import { UpdateCameraDto } from './dto/update-camera.dto';
import { PrismaService } from 'prisma/prisma.service';
export declare class CameraService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createCameraDto: CreateCameraDto, userId: number): Promise<{
        id: number;
        status: string;
        location: string;
        last_maintenance: Date;
        rtsp_address: string | null;
        resolution: string;
        responsible_person_id: number;
    }>;
    findAll(userId: number): Promise<({
        responsible_person: {
            email: string;
            password: string;
            full_name: string;
            emergency_contact: string;
            role: string;
            department: string;
            access_permissions: string[];
            id: number;
            boss_id: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: number;
        status: string;
        location: string;
        last_maintenance: Date;
        rtsp_address: string | null;
        resolution: string;
        responsible_person_id: number;
    })[]>;
    findOne(id: number): Promise<{
        id: number;
        status: string;
        location: string;
        last_maintenance: Date;
        rtsp_address: string | null;
        resolution: string;
        responsible_person_id: number;
    } | null>;
    update(id: number, updateCameraDto: UpdateCameraDto): Promise<{
        id: number;
        status: string;
        location: string;
        last_maintenance: Date;
        rtsp_address: string | null;
        resolution: string;
        responsible_person_id: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        status: string;
        location: string;
        last_maintenance: Date;
        rtsp_address: string | null;
        resolution: string;
        responsible_person_id: number;
    }>;
}
