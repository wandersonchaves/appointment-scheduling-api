import {
  IsString,
  IsEmail,
  ValidateNested,
  IsDate,
  IsNotEmpty,
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
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  photo: string;

  @IsDate()
  @Type(() => Date)
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
