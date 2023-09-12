// establishment.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsMongoId,
  ValidateNested,
} from 'class-validator';

import { AddressDTO } from './address.dto';
import { GeoDTO } from './geo.dto';
import { Type } from 'class-transformer';

export class CreateEstablishmentDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  photo: string;

  @IsString()
  @IsOptional()
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
  @IsOptional()
  address: string;

  @ValidateNested()
  @Type(() => AddressDTO)
  addressInfo: AddressDTO;

  @ValidateNested()
  @Type(() => GeoDTO)
  geo: GeoDTO;
}

export class UpdateEstablishmentDto {
  @IsMongoId()
  _id: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  photo: string;

  @IsString()
  @IsOptional()
  cover: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  address: string;

  @ValidateNested()
  @Type(() => AddressDTO)
  addressInfo: AddressDTO;

  @ValidateNested()
  @Type(() => GeoDTO)
  geo: GeoDTO;
}

export class GetEstablishmentDto {
  @IsMongoId()
  _id: string;
}

export class DeleteEstablishmentDTO {
  @IsMongoId()
  _id: string;
}
