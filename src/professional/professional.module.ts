import { Module } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { ProfessionalController } from './professional.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfessionalSchema } from './schemas/professional.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Professional', schema: ProfessionalSchema },
    ]),
  ],
  controllers: [ProfessionalController],
  providers: [ProfessionalService],
})
export class ProfessionalModule {}
