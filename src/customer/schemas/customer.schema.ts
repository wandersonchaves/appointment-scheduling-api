import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

enum DocumentTypeEnum {
  Individual = 'individual',
  Corporation = 'corporation',
}

@Schema({ timestamps: true })
export class Customer extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  photo: string;

  @Prop()
  status: string;

  @Prop()
  gender: string;

  @Prop()
  birthday: Date;

  @Prop()
  document: number;

  @Prop({
    type: {
      documentType: { type: String, enum: DocumentTypeEnum },
      documentNumber: { type: String },
    },
  })
  documentInfo: {
    documentType: string;
    documentNumber: string;
  };

  @Prop()
  address: string;

  @Prop({
    type: {
      city: { type: String },
      country: { type: String },
      uf: { type: String },
      cep: { type: String },
      number: { type: Number },
    },
  })
  addressInfo: {
    city: string;
    country: string;
    uf: string;
    cep: string;
    number: number;
  };
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
