import { IsString, IsNotEmpty, IsEmail, ValidateNested } from 'class-validator';

import { AddressDto } from './address.dto';
import { GeoDto } from './geo.dto';
import { Type } from 'class-transformer';

export class CreateEstablishmentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  photo: string;

  @IsString()
  cover: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  address: string;

  @ValidateNested()
  @Type(() => AddressDto)
  addressInfo: AddressDto;

  @ValidateNested()
  @Type(() => GeoDto)
  geo: GeoDto;
}
