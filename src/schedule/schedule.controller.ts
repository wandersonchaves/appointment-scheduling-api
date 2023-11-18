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
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { AssociationDto } from 'src/shared/services/association/dto/association.dto';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.create(createScheduleDto);
  }

  @Get()
  findAll() {
    return this.scheduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scheduleService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.scheduleService.update(id, updateScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(id);
  }

  @Post(':id/associate-appointment')
  async associateAppointment(
    @Param('id') id: string,
    @Body() associateAppointmentDto: AssociationDto,
  ) {
    return this.scheduleService.associateAppointment(
      id,
      associateAppointmentDto,
    );
  }

  @Put(':id/disassociate-appointment')
  async disassociateAppointment(
    @Param('id') id: string,
    @Body() disassociateAppointmentDto: AssociationDto,
  ) {
    return this.scheduleService.disassociateAppointment(
      id,
      disassociateAppointmentDto,
    );
  }

  @Post(':id/associate-establishment')
  async associateEstablishment(
    @Param('id') id: string,
    @Body() associateEstablishmentDto: AssociationDto,
  ) {
    return this.scheduleService.associateEstablishment(
      id,
      associateEstablishmentDto,
    );
  }

  @Put(':id/disassociate-establishment')
  async disassociateEstablishment(
    @Param('id') id: string,
    @Body() disassociateEstablishmentDto: AssociationDto,
  ) {
    return this.scheduleService.disassociateEstablishment(
      id,
      disassociateEstablishmentDto,
    );
  }

  @Post(':id/associate-professional')
  async associateProfessional(
    @Param('id') id: string,
    @Body() associateProfessionalDto: AssociationDto,
  ) {
    return this.scheduleService.associateProfessional(
      id,
      associateProfessionalDto,
    );
  }

  @Put(':id/disassociate-professional')
  async disassociateProfessional(
    @Param('id') id: string,
    @Body() disassociateProfessionalDto: AssociationDto,
  ) {
    return this.scheduleService.disassociateProfessional(
      id,
      disassociateProfessionalDto,
    );
  }

  @Post(':id/associate-service')
  async associateService(
    @Param('id') id: string,
    @Body() associateServiceDto: AssociationDto,
  ) {
    return this.scheduleService.associateService(id, associateServiceDto);
  }

  @Put(':id/disassociate-service')
  async disassociateService(
    @Param('id') id: string,
    @Body() disassociateServiceDto: AssociationDto,
  ) {
    return this.scheduleService.disassociateService(id, disassociateServiceDto);
  }
}
