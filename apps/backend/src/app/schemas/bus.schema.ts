import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Fleet } from './fleet.schema';
import { Trip } from './trip.schema';
import { Person } from './person.schema';

@Schema()
export class Bus extends Document {
  @Prop({ required: true }) // Name is mandatory
  name: string;
  @Prop()
  capacity: number;

  @Prop()
  color: string;

  @Prop()
  kg: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Fleet' })
  fleet: Fleet;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }] })
  trips: Trip[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Person' })
  driver: Person;
}

export const BusSchema = SchemaFactory.createForClass(Bus);
