import { Module } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { ProfessionalController } from './professional.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfessionalSchema } from './schemas/professional.schema';
import { SharedService } from 'src/shared/services/association/association.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Professional', schema: ProfessionalSchema },
    ]),
  ],
  controllers: [ProfessionalController],
  providers: [ProfessionalService, SharedService],
})
export class ProfessionalModule {}
