/**
 * Guard that restricts route access based on user roles.
 * Works in combination with the @Roles() decorator.
 */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Request } from 'express';

// JWT payload interface for extracting user role
interface JwtPayload {
  id: string;
  role: string;
  iat?: number;
  exp?: number;
}
// Custom Express request containing user payload
interface RequestWithUser extends Request {
  user: JwtPayload;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  /**
   * Called before a route handler executes.
   * Grants access if user's role matches one of the required roles.
   */
  canActivate(context: ExecutionContext): boolean {
    // Retrieve roles assigned by @Roles() decorator
    const requiredRoles = this.reflector.getAllAndMerge<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    console.log('Required Roles:', requiredRoles);
    console.log('User from JWT:', user);

    // If no roles are defined, allow access
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // If user or role is missing, deny access
    if (!user || !user.role) {
      console.log('User or role not found in JWT!');
      return false;
    }

    // Allow access only if user has one of the required roles
    return requiredRoles.includes(user.role);
  }
}
