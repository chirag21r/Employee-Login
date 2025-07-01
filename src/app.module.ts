// ---------- src/app.module.ts ----------
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { AuthModule } from './auth/auth.module';
import { LogsModule } from './logs/logs.module';
import { UsersModule } from './user/user.module';
import { EmployeeProfilesModule } from './employee-profile/employee-profile.module';
import { RolesModule } from './roles/role.module';
import { AuditLogsModule } from './audit-logs/audit-logs.module';
import { SessionsModule } from './sessions/sessions.module';

// Entities
import { User } from './user/entity/user.entity';
import { Log } from './logs/log.entity';
import { EmployeeProfile } from './employee-profile/entity/employee-profile.entity';
import { Role } from './roles/entity/role.entity';
import { AuditLog } from './audit-logs/entity/audit-log.entity';
import { UserSession } from './sessions/entity/user-session.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    ScheduleModule.forRoot(),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        type: 'postgres',
        host: cs.get('DB_HOST'),
        port: cs.get<number>('DB_PORT') ?? 5432,
        username: cs.get('DB_USERNAME'),
        password: cs.get('DB_PASSWORD'),
        database: cs.get('DB_NAME'),
        entities: [
          User,
          Log,
          EmployeeProfile,
          Role,
          AuditLog,
          UserSession,
        ],
        synchronize: true, // disable in prod
      }),
    }),

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
