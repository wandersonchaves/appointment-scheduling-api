import { PartialType } from '@nestjs/mapped-types';
import { CreateEstablishmentDTO } from './create-establishment.dto';

export class UpdateEstablishmentDto extends PartialType(
  CreateEstablishmentDTO,
) {}
