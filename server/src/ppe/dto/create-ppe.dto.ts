import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";
import { User } from "src/user/entities/user.entity";
import { Type } from 'class-transformer';


export class CreatePpeDto {
    @IsNumber()
    id: number;

    @IsString()
    type: string;

    @IsString()
    status: string;

    @IsDate()  
    @Type(() => Date)
    last_inspection_date: Date;

    @IsOptional()
    assigned_to_user?: User;

    @IsOptional()
    assigned_to_user_id?: number;
}
