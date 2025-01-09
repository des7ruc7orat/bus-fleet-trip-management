// import * as mongoose from 'mongoose';
// import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
//
// @Schema()
// export class Fleet extends Document {
//   @Prop()
//   capacity: number;
//
//   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' })
//   address: mongoose.Types.ObjectId; // Address is referenced by ObjectId
//
//   @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bus' }] })
//   buses: mongoose.Types.ObjectId[]; // Buses are referenced by ObjectId
// }
//
// export const FleetSchema = SchemaFactory.createForClass(Fleet);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; // Make sure this is imported
import * as mongoose from 'mongoose';

@Schema()
export class Fleet extends Document {  // Ensure it extends Document
  @Prop()
  capacity: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' })
  address: mongoose.Types.ObjectId;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bus' }] })
  buses: mongoose.Types.ObjectId[];
}

export const FleetSchema = SchemaFactory.createForClass(Fleet);
