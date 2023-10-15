import { IsArray, IsDate, IsMongoId, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateScheduleDto {
  @IsMongoId()
  establishmentId: string;

  @IsArray()
  @IsMongoId({ each: true })
  specialties: string[];

  @IsArray()
  @IsMongoId({ each: true })
  collaborators: string[];

  @IsArray()
  @IsNumber({}, { each: true })
  days: number[];

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;
}
