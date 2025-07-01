import { Log } from './log.entity';
import { Repository } from 'typeorm';
export declare class LogsService {
    private readonly logRepo;
    constructor(logRepo: Repository<Log>);
    createLog(log: Partial<Log>): Promise<Log>;
    deleteOldLogs(): Promise<number>;
}
