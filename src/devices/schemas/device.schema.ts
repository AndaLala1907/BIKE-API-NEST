/**
 * Device Schema
 *
 * Defines the Mongoose schema for devices that are paired with bikes.
 * Tracks pairing status, identifiers, and timestamps.
 * Includes support for soft deletes and automatic createdAt/updatedAt fields.
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Enum for possible device statuses
export type DeviceStatus = 'paired' | 'unpaired';

@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt
export class Device {
  @Prop({ required: true })
  bike_id: string; // ID of the bike this device is paired to

  @Prop({ required: true, unique: true })
  barcode: string; // Unique barcode used for matching devices

  @Prop({ required: true, enum: ['paired', 'unpaired'], default: 'unpaired' })
  status: DeviceStatus; // Status indicating pairing state

  @Prop({ required: true, unique: true })
  deviceId: string; // Hardware ID of the physical device

  @Prop()
  pairedAt?: Date; // Timestamp when device was paired

  @Prop()
  unpairedAt?: Date; // Timestamp when device was unpaired

  @Prop({ type: Date, default: null })
  deletedAt?: Date; // Used for soft delete (not physical removal)
}

// Mongoose document type combining schema and metadata
export type DeviceDocument = Device & Document;
// Mongoose schema factory
export const DeviceSchema = SchemaFactory.createForClass(Device);
