import { EmployeeProfileService } from './employee-profile.service';
import { CreateEmployeeProfileDto } from './dto/create-profile.dto';
import { UpdateEmployeeProfileDto } from './dto/update-profile.dto';
import { Response } from 'express';
import { AuthenticatedRequest } from 'src/types/express-request.interface';
export declare class EmployeeProfileController {
    private readonly service;
    constructor(service: EmployeeProfileService);
    create(dto: CreateEmployeeProfileDto): Promise<import("./entity/employee-profile.entity").EmployeeProfile>;
    findAll(): Promise<import("./entity/employee-profile.entity").EmployeeProfile[]>;
    findOne(id: string): Promise<import("./entity/employee-profile.entity").EmployeeProfile | null>;
    exportCSV(res: Response): Promise<void>;
    exportExcel(res: Response): Promise<void>;
    update(id: string, dto: UpdateEmployeeProfileDto, req: AuthenticatedRequest): Promise<import("./entity/employee-profile.entity").EmployeeProfile>;
    remove(id: string, req: AuthenticatedRequest): Promise<import("./entity/employee-profile.entity").EmployeeProfile>;
}
