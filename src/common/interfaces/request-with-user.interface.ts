/**
 * Extends Express's Request object to include authenticated user information.
 * Useful in guards, interceptors, and services that need access to the user.
 */
import { Request } from 'express';
import { User } from '../../users/schemas/user.schema';

// Custom Express request interface that includes the authenticated user
export interface RequestWithUser extends Request {
  user: User & { _id: string }; // User object including MongoDB _id
}
