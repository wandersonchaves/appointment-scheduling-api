import { IsDateString, IsMongoId, IsNotEmpty } from 'class-validator';

export class ProfessionalEstablishmentDto {
  @IsMongoId()
  @IsNotEmpty()
  professionalId: string;

  @IsDateString()
  @IsNotEmpty()
  associationDate: Date;
}
