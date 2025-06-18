import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { LogsService } from '../logs/log.service';
import { exec } from 'child_process';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(private readonly logsService: LogsService) {}

  @Cron('0 2 * * *') // Every day at 2AM
  async handleLogCleanup() {
    const deleted = await this.logsService.deleteOldLogs();
    this.logger.log(`Deleted ${deleted} old logs.`);
  }

  @Cron('0 3 * * 0') // Every Sunday at 3AM
  handleBackupWithRclone() {
    const remote = process.env.RCLONE_REMOTE;
    const source = process.env.RCLONE_SOURCE_PATH;
    const dest = process.env.RCLONE_DEST_PATH;

    const command = `rclone copy ${source} ${remote}:${dest}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        this.logger.error(`Backup failed: ${error.message}`);
        return;
      }
      if (stderr) {
        this.logger.warn(`Backup stderr: ${stderr}`);
        return;
      }
      this.logger.log(`Backup success: ${stdout}`);
    });
  }
}
