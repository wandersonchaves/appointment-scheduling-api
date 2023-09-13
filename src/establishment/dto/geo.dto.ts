import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class GeoDTO {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  coordinates: number[];
}
