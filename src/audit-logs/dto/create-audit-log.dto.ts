import {
    IsString,
    IsOptional,
    IsUUID,
    IsObject,
  } from 'class-validator';
  
  export class CreateAuditLogDto {
    @IsUUID()
    userId: string;
  
    @IsString()
    action: string;
  
    @IsString()
    resourceType: string;
  
    @IsUUID()
    @IsOptional()
    resourceId?: string;
  
    @IsObject()
    @IsOptional()
    oldValues?: object;
  
    @IsObject()
    @IsOptional()
    newValues?: object;
  
    @IsString()
    @IsOptional()
    ipAddress?: string;
  
    @IsString()
    @IsOptional()
    userAgent?: string;
  }
  