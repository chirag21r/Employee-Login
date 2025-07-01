import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLogsModule } from '../audit-logs/audit-logs.module';
import { EmployeeProfile } from './entity/employee-profile.entity';
import { EmployeeProfileService } from './employee-profile.service';
import { EmployeeProfileController } from './employee-profile.controller';
import { User } from 'src/user/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmployeeProfile, User]),
    AuditLogsModule, // 👈 required
  ],
  providers: [EmployeeProfileService],
  controllers: [EmployeeProfileController],
  exports: [EmployeeProfileService],
})
export class EmployeeProfilesModule {}
