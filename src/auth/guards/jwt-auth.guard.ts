/**
 * Custom JWT Auth Guard
 * - Allows guest requests (returns null user if no token)
 * - Validates JWT tokens if present
 * - Respects @Public() decorator for explicitly public routes
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

  handleRequest<TUser = any>(
    err: any,
    user: TUser | null,
    info: any,
    context: ExecutionContext,
  ): TUser | null {
    console.log('JwtAuthGuard enabled:', {
      err,
      user,
      info,
      contextType: context.getType(),
    });

    if (err) {
      throw err;
    }

    // Guest allowed → return null if no user
    return user || null;
  }
}
