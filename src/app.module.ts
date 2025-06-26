// ---------- src/app.module.ts ----------
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { AuthModule } from './auth/auth.module';
import { LogsModule } from './logs/logs.module';

// ✅ New Modules (to be created)
import { UsersModule } from './users/users.module';
import { EmployeeProfilesModule } from './employee-profiles/employee-profiles.module';
import { RolesModule } from './roles/roles.module';
import { AuditLogsModule } from './audit-logs/audit-logs.module';
import { SessionsModule } from './sessions/sessions.module';

// ✅ Updated Entities
import { User } from './users/entities/user.entity';
import { Log } from './logs/log.entity';
import { EmployeeProfile } from './employee-profiles/entities/employee-profile.entity';
import { Role } from './roles/entities/role.entity';
import { AuditLog } from './audit-logs/entities/audit-log.entity';
import { UserSession } from './sessions/entities/user-session.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ScheduleModule.forRoot(),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT') ?? 5432,
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [
          User,
          Log,
          EmployeeProfile,
          Role,
          AuditLog,
          UserSession,
        ],
        synchronize: true, // ❗ Disable in production
      }),
    }),

    // ✅ Feature Modules
    AuthModule,
    LogsModule,
    UsersModule,
    EmployeeProfilesModule,
    RolesModule,
    AuditLogsModule,
    SessionsModule,
  ],
})
export class AppModule {}
