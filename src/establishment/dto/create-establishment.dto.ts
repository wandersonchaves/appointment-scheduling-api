import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsMongoId,
  ValidateNested,
} from 'class-validator';

import { AddressDto } from './address.dto';
import { GeoDto } from './geo.dto';
import { Type } from 'class-transformer';

export class CreateEstablishmentDto {
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
  @Type(() => AddressDto)
  addressInfo: AddressDto;

  @ValidateNested()
  @Type(() => GeoDto)
  geo: GeoDto;
}

export class UpdateEstablishmentDto {
  @IsMongoId()
  readonly _id: string;

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
  @Type(() => AddressDto)
  addressInfo: AddressDto;

  @ValidateNested()
  @Type(() => GeoDto)
  geo: GeoDto;
}

export class GetEstablishmentDto {
  @IsMongoId()
  readonly _id: string;
}

export class DeleteEstablishmentDto {
  @IsMongoId()
  readonly _id: string;
}
