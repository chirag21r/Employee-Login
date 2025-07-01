import { AuditLogsService } from "./audit-logs.service";
export declare class AuditLogsController {
    private readonly auditLogsService;
    constructor(auditLogsService: AuditLogsService);
    findAll(): Promise<import("./entity/audit-log.entity").AuditLog[]>;
}
