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
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { AssociationDto } from 'src/shared/services/association/dto/association.dto';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(id, updateServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceService.remove(id);
  }

  @Post(':id/associate-appointment')
  async associateAppointment(
    @Param('id') id: string,
    @Body() associateAppointmentDto: AssociationDto,
  ) {
    return this.serviceService.associateAppointment(
      id,
      associateAppointmentDto,
    );
  }

  @Put(':id/disassociate-appointment')
  async disassociateAppointment(
    @Param('id') id: string,
    @Body() disassociateAppointmentDto: AssociationDto,
  ) {
    return this.serviceService.disassociateAppointment(
      id,
      disassociateAppointmentDto,
    );
  }

  @Post(':id/associate-establishment')
  async associateEstablishment(
    @Param('id') id: string,
    @Body() associateEstablishmentDto: AssociationDto,
  ) {
    return this.serviceService.associateEstablishment(
      id,
      associateEstablishmentDto,
    );
  }

  @Put(':id/disassociate-establishment')
  async disassociateEstablishment(
    @Param('id') id: string,
    @Body() disassociateEstablishmentDto: AssociationDto,
  ) {
    return this.serviceService.disassociateEstablishment(
      id,
      disassociateEstablishmentDto,
    );
  }

  @Post(':id/associate-professional')
  async associateProfessional(
    @Param('id') id: string,
    @Body() associateProfessionalDto: AssociationDto,
  ) {
    return this.serviceService.associateProfessional(
      id,
      associateProfessionalDto,
    );
  }

  @Put(':id/disassociate-professional')
  async disassociateProfessional(
    @Param('id') id: string,
    @Body() disassociateProfessionalDto: AssociationDto,
  ) {
    return this.serviceService.disassociateProfessional(
      id,
      disassociateProfessionalDto,
    );
  }
}
