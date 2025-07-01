import { UserService } from 'src/user/user.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findById(payload.sub, {
      relations: ['roles'],
    });

    return {
      id: user?.id,
      email: user?.email,
      roles: user?.roles.map((role) => role.name), // 👈 pass roles to req.user
    };
  }
}
