import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Address } from './address.schema';
import * as mongoose from 'mongoose';

@Schema()
export class Person extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  secondName: string;

  @Prop({ required: true })
  role: string;

  @Prop()
  bornDate: Date;t

  @Prop()
  phoneNumber: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' })
  address: Address;
  @Prop({ required: true })
  password: string;
}

export const PersonSchema = SchemaFactory.createForClass(Person);
