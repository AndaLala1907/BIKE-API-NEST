/**
 * Defines different types of speed categories (e.g., slow, moderate, fast)
 * which can be used in journey statistics.
 * Includes soft delete support and timestamps.
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt
export class SpeedType {
  @Prop({ required: true })
  name: string; // Name of the speed type

  @Prop()
  description?: string; // Optional description for this speed type

  @Prop({ default: null })
  deletedAt?: Date; // Used for soft deletion
}

// Mongoose document type
export type SpeedTypeDocument = SpeedType & Document;

// Create schema from class
export const SpeedTypeSchema = SchemaFactory.createForClass(SpeedType);
