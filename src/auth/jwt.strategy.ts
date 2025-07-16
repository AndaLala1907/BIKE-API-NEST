/**
 * Passport strategy used to validate JWTs on protected routes.
 * Extracts token from Authorization header and validates the payload.
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// Defines the shape of JWT payload
export interface JwtPayload {
  sub: string; // User ID
  role: string; // User role
  email?: string; // Optional: user email
  iat?: number; // Issued at
  exp?: number; // Expiration
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Extract JWT from Authorization: Bearer <token> header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() as () => string,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET as string, // Loaded from .env
    });
  }
  /**
   * Validates the JWT payload.
   * Ensures that a user ID (sub) exists.
   */
  validate(payload: JwtPayload): any {
    if (!payload.sub) {
      throw new UnauthorizedException('Invalid token payload');
    }

    return {
      _id: payload.sub,
      role: payload.role,
      email: payload.email,
    };
  }
}
