import { UserService } from './user.service';
import { LogsService } from '../logs/log.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserController {
    private readonly userService;
    private readonly logsService;
    constructor(userService: UserService, logsService: LogsService);
    signup(body: CreateUserDto): Promise<import("./user.entity").User>;
}
