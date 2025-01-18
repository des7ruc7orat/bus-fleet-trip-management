import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../services/user.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your-secret-key', // Make sure this matches the signing secret
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    // Validate the user with the ID (sub) in the payload
    const user = await this.userService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    // You can also attach role-based authorization here, if needed
    return { userId: user.id, role: user.role };
  }
}
