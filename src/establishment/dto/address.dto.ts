import { IsString, IsNotEmpty } from 'class-validator';

export class AddressDTO {
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  uf: string;

  @IsString()
  @IsNotEmpty()
  cep: string;

  @IsNotEmpty()
  number: number;

  @IsString()
  @IsNotEmpty()
  country: string;
}
