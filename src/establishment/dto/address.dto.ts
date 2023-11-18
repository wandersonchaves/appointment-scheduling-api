import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class AddressInfoDto {
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  uf: string;

  @IsString()
  @IsNotEmpty()
  cep: string;

  @IsNumber()
  @IsNotEmpty()
  number: number;

  @IsString()
  @IsNotEmpty()
  country: string;
}
