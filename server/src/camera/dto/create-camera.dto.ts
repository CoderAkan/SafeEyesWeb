import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreateCameraDto {
    @IsString()
    location: string;
    
    @IsString()
    status: string;

    @IsString()
    rtsp_address: string;
    
    @IsDate()
    @Type(() => Date)
    last_maintenance: Date;
    
    @IsString()
    resolution: string;
    
    @IsOptional()
    responsible_person: User;
    
    @IsOptional()
    responsible_person_id: number;
}
