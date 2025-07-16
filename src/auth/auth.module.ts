import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
/**
 * Handles authentication-related logic and setup.
 * Imports User module, configures JWT strategy and Passport integration.
 */
@Module({
  imports: [
    UsersModule, // Needed for validating users during login
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'SECRET_KEY', // Secret for signin JWTs
      signOptions: { expiresIn: '1y' }, // Token validity period
    }),
    PassportModule, // Enables passport strategy  integration
  ],
  controllers: [AuthController], // Exposes /auth routes
  providers: [AuthService, JwtStrategy], // Business logic and JWT validation
})
export class AuthModule {}
