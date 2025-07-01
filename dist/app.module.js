"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const auth_module_1 = require("./auth/auth.module");
const logs_module_1 = require("./logs/logs.module");
const user_module_1 = require("./user/user.module");
const employee_profile_module_1 = require("./employee-profile/employee-profile.module");
const role_module_1 = require("./roles/role.module");
const audit_logs_module_1 = require("./audit-logs/audit-logs.module");
const sessions_module_1 = require("./sessions/sessions.module");
const user_entity_1 = require("./user/entity/user.entity");
const log_entity_1 = require("./logs/log.entity");
const employee_profile_entity_1 = require("./employee-profile/entity/employee-profile.entity");
const role_entity_1 = require("./roles/entity/role.entity");
const audit_log_entity_1 = require("./audit-logs/entity/audit-log.entity");
const user_session_entity_1 = require("./sessions/entity/user-session.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            schedule_1.ScheduleModule.forRoot(),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (cs) => ({
                    type: 'postgres',
                    host: cs.get('DB_HOST'),
                    port: cs.get('DB_PORT') ?? 5432,
                    username: cs.get('DB_USERNAME'),
                    password: cs.get('DB_PASSWORD'),
                    database: cs.get('DB_NAME'),
                    entities: [
                        user_entity_1.User,
                        log_entity_1.Log,
                        employee_profile_entity_1.EmployeeProfile,
                        role_entity_1.Role,
                        audit_log_entity_1.AuditLog,
                        user_session_entity_1.UserSession,
                    ],
                    synchronize: true,
                }),
            }),
            auth_module_1.AuthModule,
            logs_module_1.LogsModule,
            user_module_1.UsersModule,
            employee_profile_module_1.EmployeeProfilesModule,
            role_module_1.RolesModule,
            audit_logs_module_1.AuditLogsModule,
            sessions_module_1.SessionsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map