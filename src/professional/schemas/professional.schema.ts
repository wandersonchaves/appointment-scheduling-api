import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Professional extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  photo: string;

  @Prop({ type: Date, required: true })
  birthday: Date;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  status: string;

  @Prop({ type: Object, required: false })
  bankAccount: {
    holder: string;
    cpfCnpj: string;
    bank: string;
    type: string;
    agency: string;
    number: string;
    dv: string;
  };

  @Prop({ type: Date, default: Date.now })
  registerDate: Date;

  @Prop({ required: true })
  recipientId: string;
}

export const ProfessionalSchema = SchemaFactory.createForClass(Professional);
