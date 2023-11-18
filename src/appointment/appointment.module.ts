import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentSchema } from './schemas/appointment.schema';
import { SharedService } from 'src/shared/services/association/association.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Appointment', schema: AppointmentSchema },
    ]),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService, SharedService],
})
export class AppointmentModule {}
