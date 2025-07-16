/**
 * Stores aggregated journey statistics for each user.
 * Includes distance, duration, calories, average speed.
 * Uses custom timestamp key and supports soft delete.
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: { createdAt: 'created_at' } }) // Costum timestamp field for createdAt
export class Statistic {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId; // Reference to the user

  @Prop({ type: Number, required: true })
  distance: number; // Total distance in kilometers or meters

  @Prop({ type: Number, required: true })
  duration: number; // Total duration in seconds or minutes

  @Prop({ type: Number, required: true })
  calories: number; // Total calories burned

  @Prop({ type: Number, required: true })
  avg_speed: number; // Average speed during the period

  @Prop()
  deletedAt?: Date; // Soft-delete marker
}

// Combines schema definition with Mongoose document  features
export type StatisticDocument = Statistic & Document;

// Generates schema from the class definition
export const StatisticSchema = SchemaFactory.createForClass(Statistic);
