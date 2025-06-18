import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { LogsService } from '../logs/log.service';
import { LogAction } from '../logs/log.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly logsService: LogsService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!email.endsWith('@sandlogic.com')) {
      throw new UnauthorizedException('Only sandlogic.com email addresses are allowed');
    }
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any, ip: string, userAgent: string) {
    const payload = { sub: user.id, email: user.email };

    // Save login log
    await this.logsService.createLog({
      employeeId: user.id,
      action: LogAction.LOGIN,
      ipAddress: ip || 'N/A',
      userAgent: userAgent || 'N/A',
    });

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
