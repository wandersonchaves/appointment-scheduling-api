import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Establishment extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: false })
  photo: string;

  @Prop({ type: String, required: false })
  cover: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  phone: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: Object, required: false })
  addressInfo: {
    city: string;
    country: string;
    uf: string;
    cep: string;
    number: number;
  };

  @Prop({ type: Object, required: false })
  geoInfo: {
    type: string;
    coordinates: number[];
  };
}

export const EstablishmentSchema = SchemaFactory.createForClass(Establishment);
