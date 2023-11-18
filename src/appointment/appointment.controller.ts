import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AssociationDto } from 'src/shared/services/association/dto/association.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(id);
  }

  @Post(':id/associate-customer')
  async associateCustomer(
    @Param('id') id: string,
    @Body() associateCustomerDto: AssociationDto,
  ) {
    return this.appointmentService.associateCustomer(id, associateCustomerDto);
  }

  @Put(':id/disassociate-customer')
  async disassociateCustomer(
    @Param('id') id: string,
    @Body() disassociateCustomerDto: AssociationDto,
  ) {
    return this.appointmentService.disassociateCustomer(
      id,
      disassociateCustomerDto,
    );
  }

  @Post(':id/associate-establishment')
  async associateEstablishment(
    @Param('id') id: string,
    @Body() associateEstablishmentDto: AssociationDto,
  ) {
    return this.appointmentService.associateEstablishment(
      id,
      associateEstablishmentDto,
    );
  }

  @Put(':id/disassociate-establishment')
  async disassociateEstablishment(
    @Param('id') id: string,
    @Body() disassociateEstablishmentDto: AssociationDto,
  ) {
    return this.appointmentService.disassociateEstablishment(
      id,
      disassociateEstablishmentDto,
    );
  }

  @Post(':id/associate-professional')
  async associateProfessional(
    @Param('id') id: string,
    @Body() associateProfessionalDto: AssociationDto,
  ) {
    return this.appointmentService.associateProfessional(
      id,
      associateProfessionalDto,
    );
  }

  @Put(':id/disassociate-professional')
  async disassociateProfessional(
    @Param('id') id: string,
    @Body() disassociateProfessionalDto: AssociationDto,
  ) {
    return this.appointmentService.disassociateProfessional(
      id,
      disassociateProfessionalDto,
    );
  }

  @Post(':id/associate-schedule')
  async associateSchedule(
    @Param('id') id: string,
    @Body() associateScheduleDto: AssociationDto,
  ) {
    return this.appointmentService.associateSchedule(id, associateScheduleDto);
  }

  @Put(':id/disassociate-schedule')
  async disassociateSchedule(
    @Param('id') id: string,
    @Body() disassociateScheduleDto: AssociationDto,
  ) {
    return this.appointmentService.disassociateSchedule(
      id,
      disassociateScheduleDto,
    );
  }

  @Post(':id/associate-service')
  async associateService(
    @Param('id') id: string,
    @Body() associateServiceDto: AssociationDto,
  ) {
    return this.appointmentService.associateService(id, associateServiceDto);
  }

  @Put(':id/disassociate-service')
  async disassociateService(
    @Param('id') id: string,
    @Body() disassociateServiceDto: AssociationDto,
  ) {
    return this.appointmentService.disassociateService(
      id,
      disassociateServiceDto,
    );
  }
}
