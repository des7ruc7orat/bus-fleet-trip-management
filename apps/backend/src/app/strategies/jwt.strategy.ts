import { Injectable } from '@nestjs/common';
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
      secretOrKey: 'your-secret-key', // Replace with the same secret as in `JwtModule`
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    // Example: Find user by ID or any other logic
    const user = await this.userService.findById(payload.sub);
    if (!user) {
      throw new Error('Invalid token');
    }
    return user;
  }
}
