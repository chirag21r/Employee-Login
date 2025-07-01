import {
  Controller,
  Post,
  Body,
  BadRequestException,
  ConflictException,
  Put,
  UseGuards,
  Param,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LogsService } from '../logs/log.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LogAction } from '../logs/log.entity';
import { AssignRolesDto } from './dto/assign-roles.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserRole } from 'src/common/constants/roles.enum';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logsService: LogsService,
  ) {}

  @Post('signup')
  async signup(@Body() body: CreateUserDto) {
    const { email } = body;

    if (!email.endsWith('@sandlogic.com')) {
      throw new BadRequestException('Email must be a @sandlogic.com domain');
    }

    // ✅ Check if email already exists
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    // ✅ Proceed with signup
    const user = await this.userService.createUser(body);

    await this.logsService.createLog({
      employeeId: user.id,
      action: LogAction.SIGNUP,
      ipAddress: 'N/A',
      userAgent: 'N/A',
    });

    return user;
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SUPER_ADMIN)
@Get('test')
testEndpoint() {
  return { message: 'Super Admin access granted' };
}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Put(':id/roles')
  async updateUserRoles(
    @Param('id') userId: string,
    @Body() dto: AssignRolesDto
  ) {
    return this.userService.updateRoles(userId, dto.roleIds);
  }
}
