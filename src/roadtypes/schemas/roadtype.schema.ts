/**
 * Defines the Mongoose schema for road types (e.g., asphalt, gravel, trail).
 * Each road type has a name and supports soft deletion.
 * Automatically includes createdAt and updatedAt timestamps.
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt fields
export class RoadType {
  @Prop({ required: true })
  name: string; // Name of the road type

  @Prop({ default: null })
  deletedAt?: Date; // Used for soft delete logic
}

// Combines Mongoose metadata with the RoadType model
export type RoadTypeDocument = RoadType & Document;

// Generates the schema from the class definition
export const RoadTypeSchema = SchemaFactory.createForClass(RoadType);
