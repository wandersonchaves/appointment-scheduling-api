import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AssociationDto } from 'src/shared/services/association/dto/association.dto';

export class CreateAppointmentDto {
  @ValidateNested()
  @Type(() => AssociationDto)
  customer: AssociationDto;

  @ValidateNested()
  @Type(() => AssociationDto)
  establishment: AssociationDto;

  @ValidateNested()
  @Type(() => AssociationDto)
  service: AssociationDto;

  @ValidateNested()
  @Type(() => AssociationDto)
  professional: AssociationDto;

  @ValidateNested()
  @Type(() => AssociationDto)
  schedule: AssociationDto;

  @IsDateString()
  date: Date;

  @IsNumber()
  commission: number;

  @IsNumber()
  value: number;

  @IsString()
  transactionId: string;
}
