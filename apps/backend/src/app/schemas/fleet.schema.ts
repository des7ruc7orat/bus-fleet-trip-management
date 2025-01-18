import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; // Make sure this is imported
import * as mongoose from 'mongoose';

@Schema()
export class Fleet extends Document {  // Ensure it extends Document
  @Prop()
  capacity!: number;
  @Prop()
  name!: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' })
  address: mongoose.Types.ObjectId;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bus' }] })
  buses: mongoose.Types.ObjectId[];
}

export const FleetSchema = SchemaFactory.createForClass(Fleet);
