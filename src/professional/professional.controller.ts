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
import { ProfessionalService } from './professional.service';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { AssociationDto } from 'src/shared/services/association/dto/association.dto';

@Controller('professional')
export class ProfessionalController {
  constructor(private readonly professionalService: ProfessionalService) {}

  @Post()
  create(@Body() createProfessionalDto: CreateProfessionalDto) {
    return this.professionalService.create(createProfessionalDto);
  }

  @Get()
  findAll() {
    return this.professionalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professionalService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProfessionalDto: UpdateProfessionalDto,
  ) {
    return this.professionalService.update(id, updateProfessionalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professionalService.remove(id);
  }

  @Post(':id/associate-appointment')
  async associateAppointment(
    @Param('id') id: string,
    @Body() associateAppointmentDto: AssociationDto,
  ) {
    return this.professionalService.associateAppointment(
      id,
      associateAppointmentDto,
    );
  }

  @Put(':id/disassociate-appointment')
  async disassociateAppointment(
    @Param('id') id: string,
    @Body() disassociateAppointmentDto: AssociationDto,
  ) {
    return this.professionalService.disassociateAppointment(
      id,
      disassociateAppointmentDto,
    );
  }

  @Post(':id/associate-establishment')
  async associateEstablishment(
    @Param('id') id: string,
    @Body() associateEstablishmentDto: AssociationDto,
  ) {
    return this.professionalService.associateEstablishment(
      id,
      associateEstablishmentDto,
    );
  }

  @Put(':id/disassociate-establishment')
  async disassociateEstablishment(
    @Param('id') id: string,
    @Body() disassociateEstablishmentDto: AssociationDto,
  ) {
    return this.professionalService.disassociateEstablishment(
      id,
      disassociateEstablishmentDto,
    );
  }

  @Post(':id/associate-schedule')
  async associateSchedule(
    @Param('id') id: string,
    @Body() associateScheduleDto: AssociationDto,
  ) {
    return this.professionalService.associateSchedule(id, associateScheduleDto);
  }

  @Put(':id/disassociate-schedule')
  async disassociateSchedule(
    @Param('id') id: string,
    @Body() disassociateScheduleDto: AssociationDto,
  ) {
    return this.professionalService.disassociateSchedule(
      id,
      disassociateScheduleDto,
    );
  }

  @Post(':id/associate-service')
  async associateService(
    @Param('id') id: string,
    @Body() associateServiceDto: AssociationDto,
  ) {
    return this.professionalService.associateService(id, associateServiceDto);
  }

  @Put(':id/disassociate-service')
  async disassociateService(
    @Param('id') id: string,
    @Body() disassociateServiceDto: AssociationDto,
  ) {
    return this.professionalService.disassociateService(
      id,
      disassociateServiceDto,
    );
  }
}
