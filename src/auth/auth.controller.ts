import { Controller, Post, Req, UseGuards, Get } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Req() req: Request) {
    const { email, password } = req.body;
    const user = await this.authService.validateUser(email, password);
    const ip = typeof req.ip === 'string' ? req.ip : 'N/A';
    const userAgent = typeof req.headers['user-agent'] === 'string' ? req.headers['user-agent'] : 'N/A';
    return this.authService.login(user, ip, userAgent);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() req: any) {
    return req.user;
  }
}
