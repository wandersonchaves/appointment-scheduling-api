import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Service extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Establishment' })
  establishmentId: string;

  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop()
  duration: number;

  @Prop()
  commission: number;

  @Prop()
  recurrence: number;

  @Prop()
  description: string;

  @Prop({ required: true, enum: ['A', 'I', 'E'], default: 'A' })
  status: string;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
