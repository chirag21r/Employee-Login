import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { exec } from 'child_process';

@Injectable()
export class SchedulerService {
  @Cron('0 0 * * *') // Every day at midnight
  async backupToDrive() {
    console.log('📦 Starting DB export + Google Drive backup...');

    exec('./export_db.sh', (err, stdout, stderr) => {
      if (err) {
        console.error('❌ DB Export failed:', stderr);
        return;
      }
      console.log('✅ DB Exported:\n', stdout);

      exec(`rclone sync ./logfile/ ${process.env.RCLONE_REMOTE}:${process.env.RCLONE_DEST_PATH}`, (err, stdout, stderr) => {
        if (err) {
          console.error('❌ Rclone sync failed:', stderr);
        } else {
          console.log('✅ Rclone sync success:', stdout);
        }
      });
    });
  }
}



/// FOR TESTING PURPOSES ONLY - REMOVE IN PRODUCTION
// This service runs the backup immediately on app startup and every minute for testing.


// import { Injectable, OnModuleInit } from '@nestjs/common';
// import { Cron } from '@nestjs/schedule';
// import { exec } from 'child_process';

// @Injectable()
// export class SchedulerService implements OnModuleInit {
//   async onModuleInit() {
//     console.log('🚀 Running backup immediately on app startup for testing...');
//     await this.backupToDrive();
//   }

//   @Cron('* * * * *') // every minute for testing
//   async backupToDrive() {
//     console.log('📦 Starting DB export + Google Drive backup...');

//     exec('./export_db.sh', (err, stdout, stderr) => {
//       if (err) {
//         console.error('❌ DB Export failed:', stderr);
//         return;
//       }
//       console.log('✅ DB Exported:\n', stdout);

//       exec(`rclone sync ./logfile/ ${process.env.RCLONE_REMOTE}:${process.env.RCLONE_DEST_PATH}`, (err, stdout, stderr) => {
//         if (err) {
//           console.error('❌ Rclone sync failed:', stderr);
//         } else {
//           console.log('✅ Rclone sync success:\n', stdout);
//         }
//       });
//     });
//   }
// }
