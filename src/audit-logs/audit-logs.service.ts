import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './entity/audit-log.entity';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';

@Injectable()
export class AuditLogsService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly repo: Repository<AuditLog>,
  ) {}

  async log(data: CreateAuditLogDto) {
    const log = this.repo.create(data);
    return this.repo.save(log);
  }

  findAll() {
    return this.repo.find({ relations: ['user'], order: { createdAt: 'DESC' } });
  }
}
