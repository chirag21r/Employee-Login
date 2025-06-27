import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EmployeeProfileService } from './employee-profile.service';
import { CreateEmployeeProfileDto } from './dto/create-profile.dto';
import { UpdateEmployeeProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/constants/roles.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/employees')
export class EmployeeProfileController {
  constructor(private readonly service: EmployeeProfileService) {}

  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN)
  create(@Body() dto: CreateEmployeeProfileDto) {
    return this.service.create(dto);
  }

  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN)
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN, UserRole.EMPLOYEE)
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN)
  update(@Param('id') id: string, @Body() dto: UpdateEmployeeProfileDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
