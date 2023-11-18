import mongoose, { Schema, Document } from 'mongoose';
import {
  AppointmentAssociationSchema,
  EstablishmentAssociationSchema,
  IAssociation,
} from 'src/shared/services/association/schemas/association.schema';

enum DocumentTypeEnum {
  Individual = 'individual',
  Corporation = 'corporation',
}

const CustomerAddressInfoSchema = new Schema({
  city: { type: String, required: true },
  country: { type: String, required: true },
  uf: { type: String, required: true },
  cep: { type: String, required: true },
  number: { type: Number, required: true },
});

const CustomerDocumentInfoSchema = new Schema({
  type: {
    type: String,
    enum: Object.values(DocumentTypeEnum),
    required: true,
  },
  number: { type: String, required: true },
});

export const CustomerSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    photo: { type: String, required: false },
    status: { type: String, required: false },
    gender: { type: String, required: false },
    birthday: { type: Date, required: false },
    document: { type: Number, required: false },
    documentInfo: { type: CustomerDocumentInfoSchema, required: false },
    address: { type: String, required: false },
    addressInfo: { type: CustomerAddressInfoSchema, required: false },
    establishments: [EstablishmentAssociationSchema],
    appointments: [AppointmentAssociationSchema],
  },
  { timestamps: true },
);

export interface ICustomer extends Document {
  name: string;
  phone: string;
  email: string;
  password: string;
  photo?: string;
  status?: string;
  gender?: string;
  birthday?: Date;
  document?: number;
  documentInfo?: {
    documentType: string;
    documentNumber: string;
  };
  address?: string;
  addressInfo?: {
    city: string;
    country: string;
    uf: string;
    cep: string;
    number: number;
  };
  establishments: IAssociation[];
  appointments: IAssociation[];
}

export const CustomerModel = mongoose.model<ICustomer>(
  'Customer',
  CustomerSchema,
);
