import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/types';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<{
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
    login(user: IUser): Promise<{
        id: string;
        email: string;
        token: string;
    }>;
    findOne(email: string): Promise<{
        full_name: string;
        emergency_contact: string;
        role: string;
        department: string;
        access_permissions: string[];
        id: number;
    } | null>;
}
