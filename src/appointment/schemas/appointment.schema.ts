import mongoose, { Document, Schema } from 'mongoose';

export const AppointmentSchema = new Schema(
  {
    establishmentId: { type: Schema.Types.ObjectId, required: true },
    serviceId: { type: Schema.Types.ObjectId, required: true },
    collaboratorId: { type: Schema.Types.ObjectId, required: true },
    date: { type: Date, required: true },
    commission: { type: Number, required: true },
    value: { type: Number, required: true },
    transactionId: { type: String, required: true },
  },
  { timestamps: true },
);

export interface IAppointment extends Document {
  establishmentId: string;
  serviceId: string;
  collaboratorId: string;
  date: Date;
  commission: number;
  value: number;
  transactionId: string;
}

export const AppointmentModel = mongoose.model<IAppointment>(
  'Appointment',
  AppointmentSchema,
);
