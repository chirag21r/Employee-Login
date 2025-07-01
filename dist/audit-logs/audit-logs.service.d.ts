import { Repository } from 'typeorm';
import { AuditLog } from './entity/audit-log.entity';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
export declare class AuditLogsService {
    private readonly repo;
    constructor(repo: Repository<AuditLog>);
    log(data: CreateAuditLogDto): Promise<AuditLog>;
    findAll(): Promise<AuditLog[]>;
}
