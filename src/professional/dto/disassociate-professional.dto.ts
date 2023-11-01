import { IsDateString, IsMongoId, IsNotEmpty } from 'class-validator';

export class DisassociateProfessionalDto {
  @IsMongoId()
  @IsNotEmpty()
  establishmentId: string;

  @IsDateString()
  @IsNotEmpty()
  disassociationDate: Date;
}
