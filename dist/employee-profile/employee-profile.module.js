"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeProfilesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const audit_logs_module_1 = require("../audit-logs/audit-logs.module");
const employee_profile_entity_1 = require("./entity/employee-profile.entity");
const employee_profile_service_1 = require("./employee-profile.service");
const employee_profile_controller_1 = require("./employee-profile.controller");
let EmployeeProfilesModule = class EmployeeProfilesModule {
};
exports.EmployeeProfilesModule = EmployeeProfilesModule;
exports.EmployeeProfilesModule = EmployeeProfilesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([employee_profile_entity_1.EmployeeProfile]),
            audit_logs_module_1.AuditLogsModule,
        ],
        providers: [employee_profile_service_1.EmployeeProfileService],
        controllers: [employee_profile_controller_1.EmployeeProfileController],
        exports: [employee_profile_service_1.EmployeeProfileService],
    })
], EmployeeProfilesModule);
//# sourceMappingURL=employee-profile.module.js.map