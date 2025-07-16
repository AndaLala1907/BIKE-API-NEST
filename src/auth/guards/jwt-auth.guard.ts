/**
 * Custom guard that extends NestJS's built-in AuthGuard with 'jwt' strategy.
 * Intercepts requests to validate JWT tokens using Passport and handles errors.
 * Also respects @Public() decorator to bypass auth for public routes.
 */
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  /**
   * Checks if the current route is marked as public using @Public().
   * If so, bypasses the JWT authentication.
   */

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  /**
   * Override default behavior to log and handle errors explicitly.
   */
  handleRequest<TUser = unknown>(
    err: unknown,
    user: TUser | null,
    info: unknown,
    context: ExecutionContext,
  ): TUser {
    console.log('JwtAuthGuard enabled:', {
      err,
      user,
      info,
      contextType: context.getType(),
    });

    if (err) {
      if (err instanceof Error) {
        throw err;
      } else {
        throw new UnauthorizedException('Unknown error occurred.');
      }
    }

    if (!user) {
      throw new UnauthorizedException(); // Token missing or invalid
    }

    return user;
  }
}
