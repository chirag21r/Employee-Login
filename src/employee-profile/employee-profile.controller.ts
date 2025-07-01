import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { EmployeeProfileService } from './employee-profile.service';
import { CreateEmployeeProfileDto } from './dto/create-profile.dto';
import { UpdateEmployeeProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/constants/roles.enum';
import { Response } from 'express';
import { AuthenticatedRequest } from 'src/types/express-request.interface';

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

  @Get('export/csv')
@Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN)
async exportCSV(@Res() res: Response) {
  const csv = await this.service.exportAsCSV();
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=employee_data.csv');
  res.send(csv);
}

@Get('export/excel')
@Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN)
async exportExcel(@Res() res: Response) {
  const buffer = await this.service.exportAsExcel();
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=employee_data.xlsx');
  res.send(buffer);
}

  @Put(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateEmployeeProfileDto,
    @Req() req: AuthenticatedRequest
  ) {
    return this.service.update(id, dto, {
      userId: req.user?.id!,
      ip: req.ip!,
      userAgent: req.headers['user-agent'] || '',
    });
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN)
  remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.service.remove(id, {
      userId: req.user?.id!,
      ip: req.ip!,
      userAgent: req.headers['user-agent'] || '',
    });
  }
}
