import { User } from '../../user/entity/user.entity';
export declare class AuditLog {
    id: string;
    user: User;
    action: string;
    resourceType: string;
    resourceId?: string;
    oldValues?: object;
    newValues?: object;
    ipAddress?: string;
    userAgent?: string;
    createdAt: Date;
}
