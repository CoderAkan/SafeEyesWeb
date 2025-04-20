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
}
