/**
 * Custom decorator that assigns required roles to a route.
 * Used with RolesGuard to restrict access based on user roles.
 */
import { SetMetadata } from '@nestjs/common';

// Metadata key used by the guard
export const ROLES_KEY = 'roles';

/**
  Allowed roles for accessing this route
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
