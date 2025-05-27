import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
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
    findOne(req: any): Promise<{
        id: number;
        password: string;
        full_name: string;
        emergency_contact: string;
        role: string;
        department: string;
        access_permissions: string[];
    } | null>;
    update(updateUserDto: UpdateUserDto, req: any): Promise<{
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
