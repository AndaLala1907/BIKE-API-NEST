/**
 * Express request interface that attaches a full Mongoose UserDocument.
 * Commonly used in guards and decorators when working with MongoDB models.
 */
import { Request } from 'express';
import { UserDocument } from '../../users/schemas/user.schema';

// Custom request that includes the authenticated user as a Mongoose document
export interface RequestWithUser extends Request {
  user: UserDocument;
}
