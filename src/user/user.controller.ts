import {
  Controller,
  Post,
  Body,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LogsService } from '../logs/log.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LogAction } from '../logs/log.entity';

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
}
