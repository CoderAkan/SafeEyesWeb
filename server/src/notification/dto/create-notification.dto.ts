import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

export class CreateNotificationDto {
    @IsNumber({}, { each: true })  
    recipients: number[];

    @IsDate()
    @Type(() => Date)
    timestamp: Date;

    @IsString()
    type: string;

    @IsString()
    message: string;

    @IsBoolean()
    read_status: boolean;
}