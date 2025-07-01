export declare class CreateEmployeeProfileDto {
    userId: string;
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
}
