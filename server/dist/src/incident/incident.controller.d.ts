import { IncidentService } from './incident.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { IncidentFilterDto } from './dto/incident-filter.dto';
export declare class IncidentController {
    private readonly incidentService;
    constructor(incidentService: IncidentService);
    create(createIncidentDto: CreateIncidentDto): Promise<{
        detected_by_camera: {
            id: number;
            status: string;
            location: string;
            last_maintenance: Date;
            rtsp_address: string | null;
            resolution: string;
            responsible_person_id: number;
        };
        worker: {
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
        } | null;
    } & {
        id: number;
        timestamp: Date;
        type: string;
        severity: number;
        status: string;
        detected_by_camera_id: number;
        worker_id: number | null;
    }>;
    findAll(req: any, filters: IncidentFilterDto): Promise<({
        detected_by_camera: {
            id: number;
            status: string;
            location: string;
            last_maintenance: Date;
            rtsp_address: string | null;
            resolution: string;
            responsible_person_id: number;
        };
        worker: {
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
        } | null;
    } & {
        id: number;
        timestamp: Date;
        type: string;
        severity: number;
        status: string;
        detected_by_camera_id: number;
        worker_id: number | null;
    })[]>;
    findOne(id: string): Promise<({
        detected_by_camera: {
            id: number;
            status: string;
            location: string;
            last_maintenance: Date;
            rtsp_address: string | null;
            resolution: string;
            responsible_person_id: number;
        };
        worker: {
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
        } | null;
    } & {
        id: number;
        timestamp: Date;
        type: string;
        severity: number;
        status: string;
        detected_by_camera_id: number;
        worker_id: number | null;
    }) | null>;
    update(id: string, updateIncidentDto: UpdateIncidentDto): Promise<{
        id: number;
        timestamp: Date;
        type: string;
        severity: number;
        status: string;
        detected_by_camera_id: number;
        worker_id: number | null;
    }>;
    remove(id: string): Promise<{
        id: number;
        timestamp: Date;
        type: string;
        severity: number;
        status: string;
        detected_by_camera_id: number;
        worker_id: number | null;
    }>;
}
