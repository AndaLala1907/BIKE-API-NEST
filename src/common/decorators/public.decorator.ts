import { SetMetadata } from '@nestjs/common';
/**
 * Metadata key used to mark a route as public (no auth required)
 */
export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Marks a controller method as public (excluded from JwtAuthGuard).
 * Typically used for login, register, or home routes.
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
