import { User } from "src/user/entities/user.entity";
export declare class CreateCameraDto {
    location: string;
    status: string;
    rtsp_address: string;
    last_maintenance: Date;
    resolution: string;
    responsible_person: User;
    responsible_person_id: number;
}
