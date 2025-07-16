/**
 * Defines the Mongoose schema for the Journey entity.
 * Represents a full tracking record of a bike ride by a user,
 * including timestamps, references, and burned calories.
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
@Schema({ timestamps: true }) //Automatically adds createdAt and updatedAt fiels
export class Journey {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId; // Reference to the user who started the journey

  @Prop({ type: Types.ObjectId, ref: 'Device', required: true })
  device_id: Types.ObjectId; // Device used to track the journey

  @Prop()
  device_barcode: string; // Barcode of the tracking device

  @Prop({ type: Types.ObjectId, ref: 'Bike', required: true })
  bike_id: Types.ObjectId; // Reference to the bike used

  @Prop()
  bike_barcode: string; // Barcode of the bike

  @Prop()
  bike_type: string; // Type of the bike

  @Prop()
  bike_weight: number; // Weight of the bike (used in calorie calculation)

  @Prop({ type: Types.ObjectId, ref: 'SpeedType' })
  speedType_id: Types.ObjectId; // Reference to speed type category

  @Prop({ type: Types.ObjectId, ref: 'RoadType' })
  roadType_id: Types.ObjectId; // Reference to road type category

  @Prop()
  startTime: Date; // When the journey started

  @Prop()
  endTime?: Date; // Optional: when the journey ended

  @Prop({ default: 0 })
  caloriesBurned: number; // Estimated calories burned

  @Prop({ type: Date, default: null })
  deletedAt?: Date; // Used for soft delete
}

// Mongoose document type
export type JourneyDocument = Journey & Document;

// Create Mongoose schema from class
export const JourneySchema = SchemaFactory.createForClass(Journey);
