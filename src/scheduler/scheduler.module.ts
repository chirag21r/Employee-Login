import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { LogsModule } from '../logs/logs.module';

@Module({
  imports: [LogsModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}
