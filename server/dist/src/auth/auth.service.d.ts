import { BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    private readonly userService;
    private readonly configService;
    constructor(prisma: PrismaService, jwtService: JwtService, userService: UserService, configService: ConfigService);
    signUp(createUserDto: CreateUserDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    login(email: string, password: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    findOne(email: string): Promise<BadRequestException | {
        id: number;
        full_name: string;
        emergency_contact: string;
        role: string;
        department: string;
        access_permissions: string[];
    } | null>;
    hashData(data: string): Promise<string>;
    updateRefreshToken(userId: string, refresh_token: string): Promise<void>;
    validateUser(email: string, password: string): Promise<{
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
    }>;
    getTokens(userId: string, username: string, email: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout(userId: string): Promise<{
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
    }>;
}
