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
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { AssociationDto } from 'src/shared/services/association/dto/association.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }

  @Post(':id/associate-appointment')
  async associateAppointment(
    @Param('id') id: string,
    @Body() associateAppointmentDto: AssociationDto,
  ) {
    return this.customerService.associateAppointment(
      id,
      associateAppointmentDto,
    );
  }

  @Put(':id/disassociate-appointment')
  async disassociateAppointment(
    @Param('id') id: string,
    @Body() disassociateAppointmentDto: AssociationDto,
  ) {
    return this.customerService.disassociateAppointment(
      id,
      disassociateAppointmentDto,
    );
  }

  @Post(':id/associate-establishment')
  async associateEstablishment(
    @Param('id') id: string,
    @Body() associateEstablishmentDto: AssociationDto,
  ) {
    return this.customerService.associateEstablishment(
      id,
      associateEstablishmentDto,
    );
  }

  @Put(':id/disassociate-establishment')
  async disassociateEstablishment(
    @Param('id') id: string,
    @Body() disassociateEstablishmentDto: AssociationDto,
  ) {
    return this.customerService.disassociateEstablishment(
      id,
      disassociateEstablishmentDto,
    );
  }
}
