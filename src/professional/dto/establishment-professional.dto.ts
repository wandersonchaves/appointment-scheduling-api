import { IsDateString, IsMongoId, IsNotEmpty } from 'class-validator';

export class EstablishmentProfessionalDto {
  @IsMongoId()
  @IsNotEmpty()
  establishmentId: string;

  @IsDateString()
  @IsNotEmpty()
  associationDate: Date;
}
