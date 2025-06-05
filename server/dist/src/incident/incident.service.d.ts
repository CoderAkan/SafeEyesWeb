import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { PrismaService } from 'prisma/prisma.service';
import { IncidentFilterDto } from './dto/incident-filter.dto';
export declare class IncidentService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
            id: number;
            email: string;
            password: string;
            full_name: string;
            emergency_contact: string;
            role: string;
            department: string;
            refresh_token: string;
            boss_id: string | null;
            access_permissions: string[];
            createdAt: Date;
            updatedAt: Date;
        } | null;
    } & {
        id: number;
        timestamp: Date;
        type: string;
        severity: number;
        detected_by_camera_id: number;
        worker_id: number | null;
        status: string;
    }>;
    findAll(userId: number, userRole: string, filters: IncidentFilterDto): Promise<({
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
            id: number;
            email: string;
            password: string;
            full_name: string;
            emergency_contact: string;
            role: string;
            department: string;
            refresh_token: string;
            boss_id: string | null;
            access_permissions: string[];
            createdAt: Date;
            updatedAt: Date;
        } | null;
    } & {
        id: number;
        timestamp: Date;
        type: string;
        severity: number;
        detected_by_camera_id: number;
        worker_id: number | null;
        status: string;
    })[]>;
    findOne(id: number): Promise<({
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
            id: number;
            email: string;
            password: string;
            full_name: string;
            emergency_contact: string;
            role: string;
            department: string;
            refresh_token: string;
            boss_id: string | null;
            access_permissions: string[];
            createdAt: Date;
            updatedAt: Date;
        } | null;
    } & {
        id: number;
        timestamp: Date;
        type: string;
        severity: number;
        detected_by_camera_id: number;
        worker_id: number | null;
        status: string;
    }) | null>;
    update(id: number, updateIncidentDto: UpdateIncidentDto): Promise<{
        id: number;
        timestamp: Date;
        type: string;
        severity: number;
        detected_by_camera_id: number;
        worker_id: number | null;
        status: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        timestamp: Date;
        type: string;
        severity: number;
        detected_by_camera_id: number;
        worker_id: number | null;
        status: string;
    }>;
}
