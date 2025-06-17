import { Controller, Get, Query, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  @Get('login')
  loginRedirect(@Res() res: Response) {
    const params = new URLSearchParams({
      client_id: this.config.get('AZURE_CLIENT_ID'),
      response_type: 'code',
      redirect_uri: this.config.get('AZURE_REDIRECT_URI'),
      response_mode: 'query',
      scope: 'openid profile email offline_access https://graph.microsoft.com/.default',
    });
    const loginUrl = `https://login.microsoftonline.com/${this.config.get('AZURE_TENANT_ID')}/oauth2/v2.0/authorize?${params.toString()}`;
    return res.redirect(loginUrl);
  }

  @Get('callback')
  async handleCallback(@Query('code') code: string) {
    return this.authService.validateAzureUser(code);
  }

  @Post('logout')
  async logout(@Body('email') email: string) {
    return this.authService.logout(email);
  }
}