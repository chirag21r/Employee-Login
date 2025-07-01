import { UserService } from './user.service';
import { LogsService } from '../logs/log.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AssignRolesDto } from './dto/assign-roles.dto';
export declare class UserController {
    private readonly userService;
    private readonly logsService;
    constructor(userService: UserService, logsService: LogsService);
    signup(body: CreateUserDto): Promise<import("./entity/user.entity").User>;
    testEndpoint(): {
        message: string;
    };
    updateUserRoles(userId: string, dto: AssignRolesDto): Promise<import("./entity/user.entity").User>;
}
