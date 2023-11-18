import { IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator';

export class GeoInfoDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  coordinates: number[];
}
