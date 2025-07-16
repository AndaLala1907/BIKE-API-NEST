/**
 * Log Schema
 *
 * Represents telemetry log data for a bike journey.
 * Stores coordinates, user/journey references, and journey event types.
 * Supports soft deletes and timestamping.
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// Combined document type for MongoDB
export type LogDocument = Log &
  Document & {
    createdAt?: Date;
    updatedAt?: Date;
    startedAt?: Date;
    caloriesBurned?: number;
  };

@Schema({ timestamps: true }) //Adds createdAt and updatedAt fields
export class Log {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId; // User who initiated the log entry

  @Prop({ type: Types.ObjectId, ref: 'Journey', required: true })
  journey_id: string; // Journey to which the log belongs

  @Prop({ type: Types.ObjectId, ref: 'Device', required: true })
  deviceId: string;

  @Prop({ type: [[Number]], default: [] })
  coordinates: number[][]; // Optional array of [longitude, latitude] pairs

  @Prop({ default: false })
  ended: boolean; // Indicates if this is the final log of the journey

  @Prop({ type: Date, default: null })
  deletedAt?: Date; // Used for soft deletion

  @Prop({ required: true })
  type: 'start' | 'ping' | 'stop'; // Type of log entry

  @Prop({ type: Date, required: true })
  timestamp: Date; // Timestamp from the device

  @Prop({ type: Date, default: null })
  startedAt?: Date; // Needed to calculate duration

  @Prop({ type: Number, default: 0 })
  caloriesBurned: number; // Calories burned
}

export const LogSchema = SchemaFactory.createForClass(Log);
