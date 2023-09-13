import { Module } from '@nestjs/common';
import { EstablishmentService } from './establishment.service';
import { EstablishmentController } from './establishment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Establishment,
  EstablishmentSchema,
} from './schemas/establishment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Establishment.name, schema: EstablishmentSchema },
    ]),
  ],
  controllers: [EstablishmentController],
  providers: [EstablishmentService],
})
export class EstablishmentModule {}
