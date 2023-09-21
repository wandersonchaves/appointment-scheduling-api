import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EstablishmentModule } from './establishment/establishment.module';
import { ProfessionalModule } from './professional/professional.module';
import { ServiceModule } from './service/service.module';
import { CustomerModule } from './customer/customer.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    EstablishmentModule,
    ProfessionalModule,
    ServiceModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
