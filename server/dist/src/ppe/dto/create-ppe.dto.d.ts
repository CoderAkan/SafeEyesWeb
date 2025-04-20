import { User } from "src/user/entities/user.entity";
export declare class CreatePpeDto {
    id: number;
    type: string;
    status: string;
    last_inspection_date: Date;
    assigned_to_user?: User;
    assigned_to_user_id?: number;
}
