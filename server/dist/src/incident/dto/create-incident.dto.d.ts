import { User } from "src/user/entities/user.entity";
export declare class CreateIncidentDto {
    timestamp: Date;
    severity: number;
    detected_by_camera_id: number;
    worker: User;
    worker_id: number;
    status: string;
    type: string;
}
