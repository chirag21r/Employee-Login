import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeProfile } from './entity/employee-profile.entity';
import { CreateEmployeeProfileDto } from './dto/create-profile.dto';
import { UpdateEmployeeProfileDto } from './dto/update-profile.dto';
import { Parser } from 'json2csv';
import * as ExcelJS from 'exceljs';
import { AuditLogsService } from '../audit-logs/audit-logs.service';

@Injectable()
export class EmployeeProfileService {
  constructor(
    @InjectRepository(EmployeeProfile)
    private profileRepo: Repository<EmployeeProfile>,

    private readonly auditService: AuditLogsService,
  ) {}

  create(data: CreateEmployeeProfileDto) {
    const profile = this.profileRepo.create(data);
    return this.profileRepo.save(profile);
  }

  findAll() {
    return this.profileRepo.find({ relations: ['user'] });
  }

  findOne(id: string) {
    return this.profileRepo.findOne({ where: { id }, relations: ['user'] });
  }

  async update(
    id: string,
    dto: UpdateEmployeeProfileDto,
    meta: { userId: string; ip: string; userAgent: string },
  ) {
    const profile = await this.findOne(id);
    if (!profile) throw new NotFoundException('Profile not found');

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

  async remove(
    id: string,
    meta: { userId: string; ip: string; userAgent: string },
  ) {
    const profile = await this.findOne(id);
    if (!profile) throw new NotFoundException('Profile not found');

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

  async exportAsCSV(): Promise<string> {
    const employees = await this.profileRepo.find({ relations: ['user'] });
  
    const data = employees.map(emp => ({
      employeeId: emp.employeeId,
      name: emp.user?.firstName + ' ' + emp.user?.lastName,
      department: emp.user?.department,
      email: emp.user?.email,
      phone: emp.phone,
      address: emp.address,
      salary: emp.salary,
    }));
  
    const parser = new Parser();
    return parser.parse(data);
  }
  
  async exportAsExcel(): Promise<Buffer> {
    const employees = await this.profileRepo.find({ relations: ['user'] });
  
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
        name: emp.user?.firstName + ' ' + emp.user?.lastName,
        department: emp.user?.department,
        email: emp.user?.email,
        phone: emp.phone,
        address: emp.address,
        salary: emp.salary,
      });
    });
  
    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }

}
