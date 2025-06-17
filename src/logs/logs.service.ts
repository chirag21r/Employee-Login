import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from './log.entity';

@Injectable()
export class LogsService {
  constructor(@InjectRepository(Log) private readonly logRepo: Repository<Log>) {}

  async logEvent(email: string, action: 'login' | 'logout') {
    const log = this.logRepo.create({ email, action });
    return this.logRepo.save(log);
  }
}
