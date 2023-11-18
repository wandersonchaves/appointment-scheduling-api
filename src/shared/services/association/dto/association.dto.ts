import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class AssociationDto {
  @IsMongoId()
  @IsNotEmpty()
  associationId: Types.ObjectId;
}
