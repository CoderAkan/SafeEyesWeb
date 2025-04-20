import { PpeService } from './ppe.service';
import { CreatePpeDto } from './dto/create-ppe.dto';
import { UpdatePpeDto } from './dto/update-ppe.dto';
export declare class PpeController {
    private readonly ppeService;
    constructor(ppeService: PpeService);
    create(createPpeDto: CreatePpeDto, req: any): Promise<{
        id: number;
        type: string;
        status: string;
        last_inspection_date: Date;
        assigned_to_user_id: number;
    }>;
    findAll(req: any): Promise<{
        id: number;
        type: string;
        status: string;
        last_inspection_date: Date;
        assigned_to_user_id: number;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        type: string;
        status: string;
        last_inspection_date: Date;
        assigned_to_user_id: number;
    } | null>;
    update(id: string, updatePpeDto: UpdatePpeDto, req: any): Promise<{
        id: number;
        type: string;
        status: string;
        last_inspection_date: Date;
        assigned_to_user_id: number;
    }>;
    remove(id: string): Promise<{
        id: number;
        type: string;
        status: string;
        last_inspection_date: Date;
        assigned_to_user_id: number;
    }>;
}
