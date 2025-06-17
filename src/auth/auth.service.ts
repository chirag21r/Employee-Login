import { Injectable, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { LogsService } from '../logs/logs.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    private readonly logsService: LogsService,
  ) {}

  async validateAzureUser(authCode: string) {
    const tokenResponse = await axios.post(
      `https://login.microsoftonline.com/${this.config.get('AZURE_TENANT_ID')}/oauth2/v2.0/token`,
      new URLSearchParams({
        client_id: this.config.get('AZURE_CLIENT_ID'),
        scope: 'https://graph.microsoft.com/.default',
        code: authCode,
        redirect_uri: this.config.get('AZURE_REDIRECT_URI'),
        grant_type: 'authorization_code',
        client_secret: this.config.get('AZURE_CLIENT_SECRET'),
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );

    const { access_token } = tokenResponse.data;
    const profile = await axios.get('https://graph.microsoft.com/v1.0/me', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const userEmail = profile.data.mail || profile.data.userPrincipalName;

    if (!userEmail.endsWith('@sandlogic.com')) {
      throw new ForbiddenException('Unauthorized domain');
    }

    await this.logsService.logEvent(userEmail, 'login');

    const payload = { email: userEmail, role: 'employee' };
    return { access_token: this.jwtService.sign(payload) };
  }

  async logout(email: string) {
    return this.logsService.logEvent(email, 'logout');
  }
}