import { Module } from '@nestjs/common';
import { EstablishmentService } from './establishment.service';
import { EstablishmentController } from './establishment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EstablishmentSchema } from './schemas/establishment.schema';
import { SharedService } from 'src/shared/services/association/association.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Establishment', schema: EstablishmentSchema },
    ]),
  ],
  controllers: [EstablishmentController],
  providers: [EstablishmentService, SharedService],
})
export class EstablishmentModule {}
