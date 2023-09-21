import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

class DocumentDTO {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  number: string;
}

class AddressDTO {
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  uf: string;

  @IsNumber()
  @IsNotEmpty()
  number: number;

  @IsString()
  @IsNotEmpty()
  cep: string;
}

export class CreateCustomerDto {
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
  @IsOptional()
  photo?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @IsDateString()
  @IsOptional()
  birthday?: Date;

  @IsNumber()
  @IsOptional()
  document?: number;

  @Type(() => DocumentDTO)
  @IsOptional()
  documentInfo?: DocumentDTO;

  @IsString()
  @IsOptional()
  address?: string;

  @Type(() => AddressDTO)
  @IsOptional()
  addressInfo?: AddressDTO;
}
