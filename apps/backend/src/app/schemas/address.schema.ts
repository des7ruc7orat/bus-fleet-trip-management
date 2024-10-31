import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Address extends Document {
  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  plz: string;

  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  streetNumber: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
