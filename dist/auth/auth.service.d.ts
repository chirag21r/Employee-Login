import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LogsService } from '../logs/log.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly logsService;
    constructor(userService: UserService, jwtService: JwtService, logsService: LogsService);
    validateUser(email: string, password: string): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        displayName: string;
        jobTitle: string;
        department: string;
        manager?: import("../user/entity/user.entity").User;
        isActive: boolean;
        lastLogin?: Date;
        createdAt: Date;
        updatedAt: Date;
        profile: import("../employee-profile/entity/employee-profile.entity").EmployeeProfile;
        roles: import("../roles/entity/role.entity").Role[];
    }>;
    login(user: any, ip: string, userAgent: string): Promise<{
        access_token: string;
        user: any;
    }>;
}
