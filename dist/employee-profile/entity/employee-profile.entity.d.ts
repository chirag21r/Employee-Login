import { User } from '../../user/entity/user.entity';
export declare class EmployeeProfile {
    id: string;
    user: User;
    employeeId: string;
    phone?: string;
    mobile?: string;
    address?: string;
    dateOfBirth?: Date;
    hireDate?: Date;
    employmentStatus?: string;
    salary?: number;
    emergencyContactName?: string;
    emergencyContactPhone?: string;
    skills?: object;
    certifications?: object;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
