import mongoose, { Document, Schema } from 'mongoose';

const BankAccountSchema = new Schema({
  holder: { type: String, required: true },
  cpfCnpj: { type: String, required: true },
  bank: { type: String, required: true },
  type: { type: String, required: true },
  agency: { type: String, required: true },
  number: { type: String, required: true },
  dv: { type: String, required: true },
});

export const ProfessionalSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    photo: { type: String },
    birthday: { type: Date },
    gender: { type: String },
    status: { type: String },
    bankAccount: BankAccountSchema,
    recipientId: { type: String },
  },
  { timestamps: true },
);

export interface IProfessional extends Document {
  name: string;
  phone: string;
  email: string;
  password: string;
  photo?: string;
  birthday?: Date;
  gender?: string;
  status?: string;
  bankAccount: {
    holder: string;
    cpfCnpj: string;
    bank: string;
    type: string;
    agency: string;
    number: string;
    dv: string;
  };
  recipientId: string;
}

export const ProfessionalModel = mongoose.model<IProfessional>(
  'Professional',
  ProfessionalSchema,
);
