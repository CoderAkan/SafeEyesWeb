import { IsEmail, IsStrongPassword, MinLength, IsString, IsArray, IsOptional } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @MinLength(6, { message: 'Password must be more than 6 symbols' })
    password: string;

    @IsString()
    @IsOptional()
    full_name: string;

    @IsString()
    @IsOptional()
    emergency_contact: string;

    @IsString()    
    @IsOptional()
    role: string;

    @IsString()
    @IsOptional()
    department: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    access_permissions: string[];
}