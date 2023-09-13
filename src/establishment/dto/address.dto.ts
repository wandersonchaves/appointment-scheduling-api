import { IsString, IsNotEmpty } from 'class-validator';

export class AddressDTO {
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  ut: string;

  @IsString()
  @IsNotEmpty()
  cep: string;

  @IsNotEmpty()
  number: number;

  @IsString()
  @IsNotEmpty()
  country: string;
}
