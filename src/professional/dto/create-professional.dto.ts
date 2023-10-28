import {
  IsString,
  IsEmail,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class BankAccountDto {
  @IsString()
  holder: string;

  @IsString()
  cpfCnpj: string;

  @IsString()
  bank: string;

  @IsString()
  type: string;

  @IsString()
  agency: string;

  @IsString()
  number: string;

  @IsString()
  dv: string;
}

export class CreateProfessionalDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  photo: string;

  @IsDateString()
  birthday: Date;

  @IsString()
  gender: string;

  @IsString()
  status: string;

  @ValidateNested()
  @Type(() => BankAccountDto)
  bankAccount: BankAccountDto;

  @IsString()
  recipientId: string;
}
