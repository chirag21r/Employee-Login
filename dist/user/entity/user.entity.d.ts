import { EmployeeProfile } from '../../employee-profile/entity/employee-profile.entity';
import { Role } from '../../roles/entity/role.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    displayName: string;
    jobTitle: string;
    department: string;
    manager?: User;
    isActive: boolean;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
    profile: EmployeeProfile;
    roles: Role[];
}
