import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Address } from './address.schema';
import { Bus } from './bus.schema';
import * as mongoose from 'mongoose';

@Schema()
export class Trip extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Bus' })
  bus: Bus;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' })
  beginningPoint: Address;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' })
  endingPoint: Address;

  @Prop()
  startingTime: Date;

  @Prop()
  arrivingTime: Date;
}

export const TripSchema = SchemaFactory.createForClass(Trip);
