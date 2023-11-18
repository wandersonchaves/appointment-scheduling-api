import mongoose, { Document, Schema } from 'mongoose';
import {
  CustomerAssociationSchema,
  EstablishmentAssociationSchema,
  IAssociation,
  ProfessionalAssociationSchema,
  ScheduleAssociationSchema,
  ServiceAssociationSchema,
} from 'src/shared/services/association/schemas/association.schema';

export const AppointmentSchema = new Schema(
  {
    customer: CustomerAssociationSchema,
    establishment: EstablishmentAssociationSchema,
    professional: ProfessionalAssociationSchema,
    service: ServiceAssociationSchema,
    schedule: ScheduleAssociationSchema,
    date: { type: Date, required: true },
    commission: { type: Number, required: true },
    value: { type: Number, required: true },
    transactionId: { type: String, required: true },
  },
  { timestamps: true },
);

export interface IAppointment extends Document {
  customer: IAssociation;
  establishment: IAssociation;
  professional: IAssociation;
  service: IAssociation;
  schedule: IAssociation;
  date: Date;
  commission: number;
  value: number;
  transactionId: string;
}

export const AppointmentModel = mongoose.model<IAppointment>(
  'Appointment',
  AppointmentSchema,
);
