/**
 * Defines the Mongoose schema for application users.
 * Includes personal data, authentication credentials, roles, and soft deletion support.
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true }) // Adds createdAt and updatedAt automatically
export class User {
  @Prop({ required: true })
  name: string; // Full name of the user

  @Prop({ required: true, unique: true })
  email: string; // Email address (must be unique)

  @Prop({ required: true })
  password: string; // Hashed password for authentication

  @Prop()
  weight: number; // Optional: user's weight in kg

  @Prop({ enum: ['user', 'admin'], default: 'user' })
  role: string; // Role-based access (user or admin)

  @Prop()
  deletedAt?: Date; // Marks a user as soft-deleted
}

// Mongoose document type with ObjectId
export type UserDocument = User & Document<Types.ObjectId>;

// Create schema from the class definition
export const UserSchema = SchemaFactory.createForClass(User);

// Required by CASL to detect subject type correctly
UserSchema.virtual('__caslSubjectType__').get(function () {
  return 'User';
});
