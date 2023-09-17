import { IsMongoId, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateServiceDto {
  @IsMongoId()
  @IsNotEmpty()
  establishmentId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsNumber()
  @IsNotEmpty()
  commission: number;

  @IsNumber()
  @IsNotEmpty()
  recurrence: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
