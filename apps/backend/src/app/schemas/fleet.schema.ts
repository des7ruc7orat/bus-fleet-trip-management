import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Address } from './address.schema';
import { Bus } from './bus.schema';
import * as mongoose from 'mongoose';

@Schema()
export class Fleet extends Document {
  @Prop()
  capacity: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' })
  address: Address;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bus' }] })
  buses: Bus[];
}

export const FleetSchema = SchemaFactory.createForClass(Fleet);
