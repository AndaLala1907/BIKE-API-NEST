import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

@Schema({ timestamps: true })
export class Bike {
  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  brand: string;

  @Prop()
  type: string;

  @Prop()
  image: string;

  @Prop()
  kilometers: number;

  @Prop()
  status: string;

  @Prop([String])
  colors: string[];

  @Prop({ required: true })
  name: string;

  @Prop({ unique: true })
  barcode: string;

  /** Public bikes are visible to everyone */
  @Prop({ type: Boolean, default: false })
  isPublic: boolean;

  /** Owner of the bike (reference to User) */
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  owner: Types.ObjectId | User;

  @Prop({ type: Date, default: null })
  deletedAt: Date;
}

export type BikeDocument = Bike & Document<Types.ObjectId>;
export const BikeSchema = SchemaFactory.createForClass(Bike);
