import {
  IsString,
  IsOptional,
  IsDateString,
  IsNumber,
  IsUUID,
  IsJSON,
} from 'class-validator';

export class CreateEmployeeProfileDto {
  @IsUUID()
  userId!: string;

  @IsString()
  employeeId!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  mobile?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: Date;

  @IsOptional()
  @IsDateString()
  hireDate?: Date;

  @IsOptional()
  @IsString()
  employmentStatus?: string;

  @IsOptional()
  @IsNumber()
  salary?: number;

  @IsOptional()
  @IsString()
  emergencyContactName?: string;

  @IsOptional()
  @IsString()
  emergencyContactPhone?: string;

  @IsOptional()
  skills?: object;

  @IsOptional()
  certifications?: object;
}
