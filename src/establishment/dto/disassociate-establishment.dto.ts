import { IsDateString, IsMongoId, IsNotEmpty } from 'class-validator';

export class DisassociateEstablishmentDto {
  @IsMongoId()
  @IsNotEmpty()
  professionalId: string;

  @IsDateString()
  @IsNotEmpty()
  disassociationDate: Date;
}
