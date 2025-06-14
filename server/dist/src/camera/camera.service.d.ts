import { CreateCameraDto } from './dto/create-camera.dto';
import { UpdateCameraDto } from './dto/update-camera.dto';
import { PrismaService } from 'prisma/prisma.service';
import { EventEmitter } from 'events';
export declare class CameraService extends EventEmitter {
    private readonly prisma;
    private readonly logger;
    private activeStreams;
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
            refresh_token: string;
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
    startCameraStream(cameraId: number, userId: number): Promise<void>;
    stopCameraStream(cameraId: number): void;
    getCameraStreamingStatus(cameraId: number): boolean;
    getActiveStreams(): number[];
    processFrameForAI(cameraId: number, frameBuffer: Buffer): Promise<any>;
    cleanup(): Promise<void>;
}
