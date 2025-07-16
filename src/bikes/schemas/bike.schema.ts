/**
 * Defines the MongoDB schema for the Bike model using Mongoose.
 * Includes fields for identification, ownership, types, and soft deletion.
 * Automatically tracks createdAt and updatedAt timestamps.
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Adds createdAt and updatedAt fields automtically
export class Bike {
  @Prop({ required: true })
  name: string; // Name of the bike

  @Prop({ required: true })
  type: string; // Type/category of bike

  @Prop()
  weight: number; // Optional bike weight

  @Prop({ required: true })
  user_id: string; // Reference to the owning user (user_id)

  @Prop()
  speedType: string; // Associated speed type( optional string reference)

  @Prop()
  roadType: string; // Associated road type ( optional string reference)

  @Prop({ required: true, unique: true })
  barcode: string; // Unique barcdoe for device pairing
  @Prop()
  deletedAt?: Date; // Used for soft deletes (null if active)
}
// Document type that includes Mongoose metadata
export type BikeDocument = Bike & Document;
// Mongoose schema creation from class definition
export const BikeSchema = SchemaFactory.createForClass(Bike);
