import { User } from '../../user/entity/user.entity';
export declare class UserSession {
    id: string;
    user: User;
    sessionToken: string;
    refreshToken?: string;
    expiresAt: Date;
    ipAddress?: string;
    userAgent?: string;
    isActive: boolean;
    createdAt: Date;
}
