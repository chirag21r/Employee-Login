import { Roles } from "src/common/decorators/roles.decorator";
import { AuditLogsService } from "./audit-logs.service";
import { UserRole } from "src/common/constants/roles.enum";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Controller, Get, UseGuards } from "@nestjs/common";

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SUPER_ADMIN)
@Controller('api/audit-logs')
export class AuditLogsController {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  @Get()
  findAll() {
    return this.auditLogsService.findAll();
  }
}
