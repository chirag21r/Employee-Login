import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeProfile } from './entity/employee-profile.entity';
import { EmployeeProfileService } from './employee-profile.service';
import { EmployeeProfileController } from './employee-profile.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeProfile])],
  providers: [EmployeeProfileService],
  controllers: [EmployeeProfileController],
  exports: [EmployeeProfileService],
})
export class EmployeeProfilesModule {}
