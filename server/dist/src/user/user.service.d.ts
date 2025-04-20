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
            email: string;
            password: string;
            full_name: string;
            emergency_contact: string;
            role: string;
            department: string;
            access_permissions: string[];
            id: number;
            boss_id: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
    findOne(email: string): Promise<{
        full_name: string;
        emergency_contact: string;
        role: string;
        department: string;
        access_permissions: string[];
    } | null>;
    update(updateUserDto: UpdateUserDto, userId: number): Promise<{
        email: string;
        password: string;
        full_name: string;
        emergency_contact: string;
        role: string;
        department: string;
        access_permissions: string[];
        id: number;
        boss_id: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
