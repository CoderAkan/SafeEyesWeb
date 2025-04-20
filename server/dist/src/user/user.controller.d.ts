import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
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
    findOne(req: any): Promise<{
        full_name: string;
        emergency_contact: string;
        role: string;
        department: string;
        access_permissions: string[];
    } | null>;
    update(updateUserDto: UpdateUserDto, req: any): Promise<{
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
