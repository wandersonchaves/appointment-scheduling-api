import mongoose, { Document, Schema } from 'mongoose';

export const ServiceSchema = new Schema(
  {
    establishmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Establishment',
      required: true,
    },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    commission: { type: Number, required: true },
    recurrence: { type: Number, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ['A', 'I', 'E'],
      default: 'A',
    },
  },
  { timestamps: true },
);

export interface IService extends Document {
  establishmentId: string;
  title: string;
  price: number;
  duration: number;
  commission: number;
  recurrence: number;
  description: string;
  status: string;
}

export const ServiceModel = mongoose.model<IService>('Service', ServiceSchema);
