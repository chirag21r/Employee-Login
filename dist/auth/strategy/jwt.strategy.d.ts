import { UserService } from 'src/user/user.service';
import { Strategy } from 'passport-jwt';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userService;
    constructor(userService: UserService);
    validate(payload: any): Promise<{
        id: string | undefined;
        email: string | undefined;
        roles: string[] | undefined;
    }>;
}
export {};
