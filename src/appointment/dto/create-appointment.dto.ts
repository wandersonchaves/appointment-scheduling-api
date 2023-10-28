import { IsDate, IsMongoId, IsNumber, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsMongoId()
  establishmentId: string;

  @IsMongoId()
  serviceId: string;

  @IsMongoId()
  collaboratorId: string;

  @IsDate()
  date: Date;

  @IsNumber()
  commission: number;

  @IsNumber()
  value: number;

  @IsString()
  transactionId: string;
}
