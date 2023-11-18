import {
  IsString,
  IsNotEmpty,
  IsEmail,
  ValidateNested,
  IsOptional,
} from 'class-validator';

import { AddressInfoDto } from './address.dto';
import { GeoInfoDto } from './geo.dto';
import { Type } from 'class-transformer';

export class CreateEstablishmentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  photo: string;

  @IsOptional()
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

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => AddressInfoDto)
  addressInfo: AddressInfoDto;

  @ValidateNested()
  @Type(() => GeoInfoDto)
  geoInfo: GeoInfoDto;

  // @IsOptional()
  // @ValidateNested()
  // @Type(() => AssociateProfessionalDto)
  // professionals: AssociateProfessionalDto[];

  // @IsOptional()
  // @ValidateNested()
  // @Type(() => AssociateScheduleDto)
  // schedules: AssociateScheduleDto[];

  // @IsOptional()
  // @ValidateNested()
  // @Type(() => AssociateServiceDto)
  // services: AssociateServiceDto[];
}
