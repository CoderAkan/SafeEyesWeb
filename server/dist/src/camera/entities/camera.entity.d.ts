import { User } from "src/user/entities/user.entity";
export declare class Camera {
    id: string;
    location: string;
    status: string;
    last_maintenance: Date;
    resolution: string;
    responsible_person: User;
    responsible_person_id: number;
}
