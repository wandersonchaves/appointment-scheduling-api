import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

enum DocumentTypeEnum {
  Individual = 'individual',
  Corporation = 'corporation',
}

@Schema({ timestamps: true })
export class Customer extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  phone: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: false })
  photo: string;

  @Prop({ type: String, required: false })
  status: string;

  @Prop({ type: String, required: false })
  gender: string;

  @Prop({ type: Date, required: false })
  birthday: Date;

  @Prop({ type: Number, required: false })
  document: number;

  @Prop({ type: Object, required: false })
  documentInfo: {
    documentType: DocumentTypeEnum;
    documentNumber: string;
  };

  @Prop({ type: String, required: false })
  address: string;

  @Prop({ type: Object, required: false })
  addressInfo: {
    city: string;
    country: string;
    uf: string;
    cep: string;
    number: number;
  };
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
