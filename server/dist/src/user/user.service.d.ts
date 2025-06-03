import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private readonly jwtService;
    private readonly prisma;
    constructor(jwtService: JwtService, prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        user: {
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
        };
        token: string;
    }>;
    findOne(email: string): Promise<{
        id: number;
        email: string;
        password: string;
        full_name: string;
        emergency_contact: string;
        role: string;
        department: string;
        access_permissions: string[];
    } | null>;
    findById(id: number): Promise<{
        id: number;
        email: string;
        password: string;
        full_name: string;
        emergency_contact: string;
        role: string;
        department: string;
        access_permissions: string[];
    } | null>;
    update(updateUserDto: UpdateUserDto, userId: number): Promise<{
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
