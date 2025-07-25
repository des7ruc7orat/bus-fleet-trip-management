import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Address extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  postCode: string;

  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  streetNumber: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
