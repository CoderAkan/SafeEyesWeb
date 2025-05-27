import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(createUserDto: CreateUserDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    login(req: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    getProfile(req: any): Promise<{
        id: number;
        full_name: string;
        emergency_contact: string;
        role: string;
        department: string;
        access_permissions: string[];
    } | null>;
}
