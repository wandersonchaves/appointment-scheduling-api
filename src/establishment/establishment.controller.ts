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
import { ProfessionalEstablishmentDto } from './dto/professional-establishment.dto';
import { DisassociateEstablishmentDto } from './dto/disassociate-establishment.dto';

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

  @Post(':id/professional')
  async professionalEstablishment(
    @Param('id') id: string,
    @Body() professionalEstablishmentDto: ProfessionalEstablishmentDto,
  ) {
    return this.establishmentService.professionalEstablishment(
      id,
      professionalEstablishmentDto,
    );
  }

  @Put(':id/disassociate')
  async disassociateEstablishment(
    @Param('id') id: string,
    @Body() disassociateEstablishmentDto: DisassociateEstablishmentDto,
  ) {
    return this.establishmentService.disassociateEstablishment(
      id,
      disassociateEstablishmentDto,
    );
  }
}
