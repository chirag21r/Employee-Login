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
exports.EmployeeProfileService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const employee_profile_entity_1 = require("./entity/employee-profile.entity");
const json2csv_1 = require("json2csv");
const ExcelJS = require("exceljs");
const audit_logs_service_1 = require("../audit-logs/audit-logs.service");
const user_entity_1 = require("../user/entity/user.entity");
let EmployeeProfileService = class EmployeeProfileService {
    constructor(profileRepo, userRepo, auditService) {
        this.profileRepo = profileRepo;
        this.userRepo = userRepo;
        this.auditService = auditService;
    }
    async create(data) {
        const user = await this.userRepo.findOne({ where: { id: data.userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const profile = this.profileRepo.create({
            ...data,
            user,
        });
        return await this.profileRepo.save(profile);
    }
    async findAll() {
        return await this.profileRepo.find({ relations: ['user'] });
    }
    async findOne(id) {
        return await this.profileRepo.findOne({ where: { id }, relations: ['user'] });
    }
    async update(id, dto, meta) {
        const profile = await this.findOne(id);
        if (!profile)
            throw new common_1.NotFoundException('Profile not found');
        const oldValues = { ...profile };
        Object.assign(profile, dto);
        const saved = await this.profileRepo.save(profile);
        await this.auditService.log({
            userId: meta.userId,
            action: 'UPDATE',
            resourceType: 'EmployeeProfile',
            resourceId: id,
            oldValues,
            newValues: dto,
            ipAddress: meta.ip,
            userAgent: meta.userAgent,
        });
        return saved;
    }
    async remove(id, meta) {
        const profile = await this.findOne(id);
        if (!profile)
            throw new common_1.NotFoundException('Profile not found');
        const result = await this.profileRepo.softRemove(profile);
        await this.auditService.log({
            userId: meta.userId,
            action: 'DELETE',
            resourceType: 'EmployeeProfile',
            resourceId: id,
            oldValues: profile,
            newValues: profile,
            ipAddress: meta.ip,
            userAgent: meta.userAgent,
        });
        return result;
    }
    async exportAsCSV() {
        const employees = await this.profileRepo.find({
            relations: ['user'],
            where: { deletedAt: (0, typeorm_2.IsNull)() },
        });
        const data = employees.map(emp => ({
            employeeId: emp.employeeId,
            name: emp.user ? `${emp.user.firstName} ${emp.user.lastName}` : 'N/A',
            department: emp.user?.department || 'N/A',
            email: emp.user?.email || 'N/A',
            phone: emp.phone,
            address: emp.address,
            salary: emp.salary,
        }));
        console.log('📦 Exporting CSV Data:', data);
        const parser = new json2csv_1.Parser();
        return parser.parse(data);
    }
    async exportAsExcel() {
        const employees = await this.profileRepo.find({
            relations: ['user'],
            where: { deletedAt: (0, typeorm_2.IsNull)() },
        });
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Employees');
        worksheet.columns = [
            { header: 'Employee ID', key: 'employeeId', width: 15 },
            { header: 'Name', key: 'name', width: 25 },
            { header: 'Department', key: 'department', width: 20 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Phone', key: 'phone', width: 15 },
            { header: 'Address', key: 'address', width: 30 },
            { header: 'Salary', key: 'salary', width: 15 },
        ];
        employees.forEach(emp => {
            worksheet.addRow({
                employeeId: emp.employeeId,
                name: emp.user ? `${emp.user.firstName} ${emp.user.lastName}` : 'N/A',
                department: emp.user?.department || 'N/A',
                email: emp.user?.email || 'N/A',
                phone: emp.phone,
                address: emp.address,
                salary: emp.salary,
            });
        });
        const buffer = await workbook.xlsx.writeBuffer();
        return Buffer.from(buffer);
    }
};
exports.EmployeeProfileService = EmployeeProfileService;
exports.EmployeeProfileService = EmployeeProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_profile_entity_1.EmployeeProfile)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        audit_logs_service_1.AuditLogsService])
], EmployeeProfileService);
//# sourceMappingURL=employee-profile.service.js.map