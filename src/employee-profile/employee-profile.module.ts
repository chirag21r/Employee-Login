import { AuditLogsModule } from '../audit-logs/audit-logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmployeeProfile]),
    AuditLogsModule, // 👈 required
  ],
  providers: [EmployeeProfileService],
  controllers: [EmployeeProfileController],
  exports: [EmployeeProfileService],
})
export class EmployeeProfilesModule {}
