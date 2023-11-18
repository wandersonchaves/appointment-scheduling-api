import mongoose, { Document, Schema } from 'mongoose';
import {
  AppointmentAssociationSchema,
  EstablishmentAssociationSchema,
  IAssociation,
  ProfessionalAssociationSchema,
  ServiceAssociationSchema,
} from 'src/shared/services/association/schemas/association.schema';

export const ScheduleSchema = new Schema(
  {
    days: [{ type: Number, required: true }],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    establishments: [EstablishmentAssociationSchema],
    professionals: [ProfessionalAssociationSchema],
    services: [ServiceAssociationSchema],
    appointments: [AppointmentAssociationSchema],
  },
  { timestamps: true },
);

export interface ISchedule extends Document {
  days: number[];
  startDate: Date;
  endDate: Date;
  establishments: IAssociation[];
  professionals: IAssociation[];
  services: IAssociation[];
  appointments: IAssociation[];
}

export const ScheduleModel = mongoose.model<ISchedule>(
  'Schedule',
  ScheduleSchema,
);
