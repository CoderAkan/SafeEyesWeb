import { CameraService } from './camera.service';
import { CreateCameraDto } from './dto/create-camera.dto';
import { UpdateCameraDto } from './dto/update-camera.dto';
export declare class CameraController {
    private readonly cameraService;
    constructor(cameraService: CameraService);
    create(createCameraDto: CreateCameraDto, req: any): Promise<{
        id: number;
        status: string;
        location: string;
        last_maintenance: Date;
        rtsp_address: string | null;
        resolution: string;
        responsible_person_id: number;
    }>;
    findAll(req: any): Promise<({
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
    findOne(id: string): Promise<{
        id: number;
        status: string;
        location: string;
        last_maintenance: Date;
        rtsp_address: string | null;
        resolution: string;
        responsible_person_id: number;
    } | null>;
    update(id: string, updateCameraDto: UpdateCameraDto): Promise<{
        id: number;
        status: string;
        location: string;
        last_maintenance: Date;
        rtsp_address: string | null;
        resolution: string;
        responsible_person_id: number;
    }>;
    remove(id: string): Promise<{
        id: number;
        status: string;
        location: string;
        last_maintenance: Date;
        rtsp_address: string | null;
        resolution: string;
        responsible_person_id: number;
    }>;
    startStream(id: string, req: any): Promise<{
        message: string;
        cameraId: number;
        status: string;
    }>;
    stopStream(id: string): {
        message: string;
        cameraId: number;
        status: string;
    };
    getStreamStatus(id: string): {
        cameraId: number;
        isStreaming: boolean;
        status: string;
        timestamp: string;
    };
    getActiveStreams(req: any): {
        activeStreams: number[];
        count: number;
        timestamp: string;
    };
    stopAllStreams(): Promise<{
        message: string;
        timestamp: string;
    }>;
}
