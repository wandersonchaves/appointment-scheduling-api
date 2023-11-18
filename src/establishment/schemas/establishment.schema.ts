import mongoose, { Document, Schema } from 'mongoose';
import {
  CustomerAssociationSchema,
  IAssociation,
  ProfessionalAssociationSchema,
  ScheduleAssociationSchema,
  ServiceAssociationSchema,
} from 'src/shared/services/association/schemas/association.schema';

export const EstablishmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    photo: String,
    cover: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: String,
    addressInfo: {
      city: String,
      country: String,
      uf: String,
      cep: String,
      number: Number,
    },
    geoInfo: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    customers: [CustomerAssociationSchema],
    professionals: [ProfessionalAssociationSchema],
    services: [ServiceAssociationSchema],
    schedules: [ScheduleAssociationSchema],
  },
  { timestamps: true },
);

EstablishmentSchema.index({ 'geoInfo.coordinates': '2dsphere' });

export interface IEstablishment extends Document {
  name: string;
  photo: string;
  cover: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  addressInfo: {
    city: string;
    country: string;
    uf: string;
    cep: string;
    number: number;
  };
  geoInfo: {
    type: {
      type: string;
      enum: ['Point'];
      default: 'Point';
    };
    coordinates: [number];
  };
  customers: IAssociation[];
  professionals: IAssociation[];
  services: IAssociation[];
  schedules: IAssociation[];
}

export const EstablishmentModel = mongoose.model<IEstablishment>(
  'Establishment',
  EstablishmentSchema,
);
