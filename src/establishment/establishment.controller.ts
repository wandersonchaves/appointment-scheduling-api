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
import { EstablishmentService } from './establishment.service';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { AssociationDto } from 'src/shared/services/association/dto/association.dto';

@Controller('establishment')
export class EstablishmentController {
  constructor(private readonly establishmentService: EstablishmentService) {}

  @Post()
  create(@Body() createEstablishmentDto: CreateEstablishmentDto) {
    return this.establishmentService.create(createEstablishmentDto);
  }

  @Get()
  findAll() {
    return this.establishmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.establishmentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEstablishmentDto: UpdateEstablishmentDto,
  ) {
    return this.establishmentService.update(id, updateEstablishmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.establishmentService.remove(id);
  }

  @Post(':id/associate-customer')
  async associateCustomer(
    @Param('id') id: string,
    @Body() associateCustomerDto: AssociationDto,
  ) {
    return this.establishmentService.associateCustomer(
      id,
      associateCustomerDto,
    );
  }

  @Put(':id/disassociate-customer')
  async disassociateCustomer(
    @Param('id') id: string,
    @Body() disassociateCustomerDto: AssociationDto,
  ) {
    return this.establishmentService.disassociateCustomer(
      id,
      disassociateCustomerDto,
    );
  }

  @Post(':id/associate-professional')
  async associateProfessional(
    @Param('id') id: string,
    @Body() associateProfessionalDto: AssociationDto,
  ) {
    return this.establishmentService.associateProfessional(
      id,
      associateProfessionalDto,
    );
  }

  @Put(':id/disassociate-professional')
  async disassociateProfessional(
    @Param('id') id: string,
    @Body() disassociateProfessionalDto: AssociationDto,
  ) {
    return this.establishmentService.disassociateProfessional(
      id,
      disassociateProfessionalDto,
    );
  }

  @Post(':id/associate-schedule')
  async associateSchedule(
    @Param('id') id: string,
    @Body() associateScheduleDto: AssociationDto,
  ) {
    return this.establishmentService.associateSchedule(
      id,
      associateScheduleDto,
    );
  }

  @Put(':id/disassociate-schedule')
  async disassociateSchedule(
    @Param('id') id: string,
    @Body() disassociateScheduleDto: AssociationDto,
  ) {
    return this.establishmentService.disassociateSchedule(
      id,
      disassociateScheduleDto,
    );
  }

  @Post(':id/associate-service')
  async associateService(
    @Param('id') id: string,
    @Body() associateServiceDto: AssociationDto,
  ) {
    return this.establishmentService.associateService(id, associateServiceDto);
  }

  @Put(':id/disassociate-service')
  async disassociateService(
    @Param('id') id: string,
    @Body() disassociateServiceDto: AssociationDto,
  ) {
    return this.establishmentService.disassociateService(
      id,
      disassociateServiceDto,
    );
  }
}
