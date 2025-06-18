import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log, LogAction } from './log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Log)
    private readonly logRepo: Repository<Log>,
  ) {}

  async createLog(log: Partial<Log>): Promise<Log> {
    return this.logRepo.save(log);
  }

  async deleteOldLogs(): Promise<number> {
    const result = await this.logRepo
      .createQueryBuilder()
      .delete()
      .where('timestamp < NOW() - INTERVAL \'7 days\'')
      .execute();
    return result.affected || 0;
  }
}
