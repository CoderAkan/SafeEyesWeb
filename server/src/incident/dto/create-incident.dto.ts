import { Type } from "class-transformer";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";
import { Camera } from "src/camera/entities/camera.entity";
import { User } from "src/user/entities/user.entity";

export class CreateIncidentDto {
    @IsDate()
    @Type(() => Date)
    timestamp: Date;

    @IsNumber()
    severity: number;
    
    @IsNumber()
    detected_by_camera_id: number;

    @IsOptional()
    worker: User;

    @IsOptional()
    worker_id: number;

    @IsString()
    status: string;

    @IsString()
    type: string;
}
