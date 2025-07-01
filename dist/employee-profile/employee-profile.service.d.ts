import { Repository } from 'typeorm';
import { EmployeeProfile } from './entity/employee-profile.entity';
import { CreateEmployeeProfileDto } from './dto/create-profile.dto';
import { UpdateEmployeeProfileDto } from './dto/update-profile.dto';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import { User } from '../user/entity/user.entity';
export declare class EmployeeProfileService {
    private profileRepo;
    private userRepo;
    private readonly auditService;
    constructor(profileRepo: Repository<EmployeeProfile>, userRepo: Repository<User>, auditService: AuditLogsService);
    create(data: CreateEmployeeProfileDto): Promise<EmployeeProfile>;
    findAll(): Promise<EmployeeProfile[]>;
    findOne(id: string): Promise<EmployeeProfile | null>;
    update(id: string, dto: UpdateEmployeeProfileDto, meta: {
        userId: string;
        ip: string;
        userAgent: string;
    }): Promise<EmployeeProfile>;
    remove(id: string, meta: {
        userId: string;
        ip: string;
        userAgent: string;
    }): Promise<EmployeeProfile>;
    exportAsCSV(): Promise<string>;
    exportAsExcel(): Promise<Buffer>;
}
