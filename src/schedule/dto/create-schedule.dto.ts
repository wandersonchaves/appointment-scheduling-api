import {
  IsArray,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateScheduleDto {
  @IsMongoId()
  @IsNotEmpty()
  establishmentId: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  days: number[];

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  endDate: Date;

  // @ValidateNested()
  // @Type(() => AssociationDto)
  // @IsArray()
  // services: AssociationDto[];

  // @ValidateNested()
  // @Type(() => AssociationDto)
  // @IsArray()
  // professionals: AssociationDto[];
}
