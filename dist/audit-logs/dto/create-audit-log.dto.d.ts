export declare class CreateAuditLogDto {
    userId: string;
    action: string;
    resourceType: string;
    resourceId: string;
    oldValues: object;
    newValues: object;
    ipAddress: string;
    userAgent: string;
}
