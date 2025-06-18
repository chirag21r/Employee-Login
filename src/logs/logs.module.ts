import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsService } from './log.service';
import { Log } from './log.entity';
import { SchedulerService } from './scheduler.service';

@Module({
  imports: [TypeOrmModule.forFeature([Log])],
  providers: [LogsService, SchedulerService],
  exports: [LogsService],
})
export class LogsModule {}
