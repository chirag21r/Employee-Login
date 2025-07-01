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
    // Step 1: Check domain early
    if (!email.endsWith('@sandlogic.com')) {
      throw new UnauthorizedException('Only sandlogic.com email addresses are allowed');
    }
  
    // Step 2: Find user
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    // Step 3: Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    // Step 4: Return safe user + token
    const { password: _, ...safeUser } = user;
    return safeUser;
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
