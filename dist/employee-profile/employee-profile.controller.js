"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeProfileController = void 0;
const common_1 = require("@nestjs/common");
const employee_profile_service_1 = require("./employee-profile.service");
const create_profile_dto_1 = require("./dto/create-profile.dto");
const update_profile_dto_1 = require("./dto/update-profile.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const roles_enum_1 = require("../common/constants/roles.enum");
let EmployeeProfileController = class EmployeeProfileController {
    constructor(service) {
        this.service = service;
    }
    create(dto) {
        return this.service.create(dto);
    }
    findAll() {
        return this.service.findAll();
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    async exportCSV(res) {
        const csv = await this.service.exportAsCSV();
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=employee_data.csv');
        res.send(csv);
    }
    async exportExcel(res) {
        const buffer = await this.service.exportAsExcel();
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=employee_data.xlsx');
        res.send(buffer);
    }
    update(id, dto, req) {
        return this.service.update(id, dto, {
            userId: req.user?.id,
            ip: req.ip,
            userAgent: req.headers['user-agent'] || '',
        });
    }
    remove(id, req) {
        return this.service.remove(id, {
            userId: req.user?.id,
            ip: req.ip,
            userAgent: req.headers['user-agent'] || '',
        });
    }
};
exports.EmployeeProfileController = EmployeeProfileController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(roles_enum_1.UserRole.SUPER_ADMIN, roles_enum_1.UserRole.HR_ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_profile_dto_1.CreateEmployeeProfileDto]),
    __metadata("design:returntype", void 0)
], EmployeeProfileController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(roles_enum_1.UserRole.SUPER_ADMIN, roles_enum_1.UserRole.HR_ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EmployeeProfileController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(roles_enum_1.UserRole.SUPER_ADMIN, roles_enum_1.UserRole.HR_ADMIN, roles_enum_1.UserRole.EMPLOYEE),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmployeeProfileController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('export/csv'),
    (0, roles_decorator_1.Roles)(roles_enum_1.UserRole.SUPER_ADMIN, roles_enum_1.UserRole.HR_ADMIN),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeProfileController.prototype, "exportCSV", null);
__decorate([
    (0, common_1.Get)('export/excel'),
    (0, roles_decorator_1.Roles)(roles_enum_1.UserRole.SUPER_ADMIN, roles_enum_1.UserRole.HR_ADMIN),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeProfileController.prototype, "exportExcel", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(roles_enum_1.UserRole.SUPER_ADMIN, roles_enum_1.UserRole.HR_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_profile_dto_1.UpdateEmployeeProfileDto, Object]),
    __metadata("design:returntype", void 0)
], EmployeeProfileController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(roles_enum_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], EmployeeProfileController.prototype, "remove", null);
exports.EmployeeProfileController = EmployeeProfileController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('api/employees'),
    __metadata("design:paramtypes", [employee_profile_service_1.EmployeeProfileService])
], EmployeeProfileController);
//# sourceMappingURL=employee-profile.controller.js.map