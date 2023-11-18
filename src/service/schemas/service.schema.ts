import mongoose, { Document, Schema } from 'mongoose';
import {
  AppointmentAssociationSchema,
  EstablishmentAssociationSchema,
  IAssociation,
  ProfessionalAssociationSchema,
} from 'src/shared/services/association/schemas/association.schema';

export const ServiceSchema = new Schema(
  {
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
    establishments: [EstablishmentAssociationSchema],
    professionals: [ProfessionalAssociationSchema],
    appointments: [AppointmentAssociationSchema],
  },
  { timestamps: true },
);

export interface IService extends Document {
  title: string;
  price: number;
  duration: number;
  commission: number;
  recurrence: number;
  description: string;
  status: string;
  establishments: IAssociation[];
  professionals: IAssociation[];
  appointments: IAssociation[];
}

export const ServiceModel = mongoose.model<IService>('Service', ServiceSchema);
