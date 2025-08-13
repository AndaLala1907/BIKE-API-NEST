/**
 * Passport strategy used to validate JWTs on protected routes.
 * Extracts token from Authorization header and validates the payload.
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload {
  sub: string; // User ID
  role: 'user' | 'admin';
  email?: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() as () => string,
      ignoreExpiration: false,
      // Fallback nëse JWT_SECRET mungon, që të përputhet me JwtModule.register(...)
      secretOrKey: process.env.JWT_SECRET ?? 'dev-secret',
    });
  }

  validate(payload: JwtPayload): any {
    if (!payload?.sub) {
      throw new UnauthorizedException('Invalid token payload');
    }
    // Kthe strukturë minimale që CASL/PoliciesGuard presin
    return {
      _id: payload.sub,
      role: payload.role,
      email: payload.email,
    };
  }
}
