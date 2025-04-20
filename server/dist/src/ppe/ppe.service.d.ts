import { CreatePpeDto } from './dto/create-ppe.dto';
import { UpdatePpeDto } from './dto/update-ppe.dto';
import { PrismaService } from 'prisma/prisma.service';
export declare class PpeService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createPpeDto: CreatePpeDto, userId: number): Promise<{
        id: number;
        type: string;
        status: string;
        last_inspection_date: Date;
        assigned_to_user_id: number;
    }>;
    findAll(id: number): Promise<{
        id: number;
        type: string;
        status: string;
        last_inspection_date: Date;
        assigned_to_user_id: number;
    }[]>;
    findOne(ppeId: number): Promise<{
        id: number;
        type: string;
        status: string;
        last_inspection_date: Date;
        assigned_to_user_id: number;
    } | null>;
    update(id: number, updatePpeDto: UpdatePpeDto, userId: number): Promise<{
        id: number;
        type: string;
        status: string;
        last_inspection_date: Date;
        assigned_to_user_id: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        type: string;
        status: string;
        last_inspection_date: Date;
        assigned_to_user_id: number;
    }>;
}
