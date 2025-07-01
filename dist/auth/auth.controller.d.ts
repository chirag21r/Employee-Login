import { Request } from 'express';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: Request): Promise<{
        access_token: string;
        user: import("../user/entity/user.entity").User | undefined;
    }>;
    getProfile(req: any): any;
}
