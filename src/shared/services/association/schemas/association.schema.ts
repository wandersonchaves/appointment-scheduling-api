import { Schema, Types } from 'mongoose';

export interface IAssociation {
  associationId: Types.ObjectId;
  associationDate: Date;
  isDisabled: boolean;
  disassociationDate?: Date;
}

function createAssociationSchema<T extends IAssociation>(modelName: string) {
  return new Schema<T>({
    associationId: {
      type: Types.ObjectId,
      ref: modelName,
      required: true,
    },
    associationDate: { type: Date, required: true },
    isDisabled: { type: Boolean, default: false },
    disassociationDate: { type: Date },
  });
}

export const AppointmentAssociationSchema =
  createAssociationSchema<IAssociation>('Appointment');
export const CustomerAssociationSchema =
  createAssociationSchema<IAssociation>('Customer');
export const EstablishmentAssociationSchema =
  createAssociationSchema<IAssociation>('Establishment');
export const ProfessionalAssociationSchema =
  createAssociationSchema<IAssociation>('Professional');
export const ServiceAssociationSchema =
  createAssociationSchema<IAssociation>('Service');
export const ScheduleAssociationSchema =
  createAssociationSchema<IAssociation>('Schedule');
