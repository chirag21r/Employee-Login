import { LogsService } from '../logs/log.service';
export declare class SchedulerService {
    private readonly logsService;
    private readonly logger;
    constructor(logsService: LogsService);
    handleLogCleanup(): Promise<void>;
    handleBackupWithRclone(): void;
}
