import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LogsService } from '../logs/log.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly logsService;
    constructor(userService: UserService, jwtService: JwtService, logsService: LogsService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any, ip: string, userAgent: string): Promise<{
        access_token: string;
        user: any;
    }>;
}
