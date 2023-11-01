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
import { EstablishmentProfessionalDto } from './dto/establishment-professional.dto';
import { DisassociateProfessionalDto } from './dto/disassociate-professional.dto';

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

  @Post(':id/establishment')
  async establishmentProfessional(
    @Param('id') id: string,
    @Body() establishmentProfessionalDto: EstablishmentProfessionalDto,
  ) {
    return this.professionalService.establishmentProfessional(
      id,
      establishmentProfessionalDto,
    );
  }

  @Put(':id/disassociate')
  async disassociateProfessional(
    @Param('id') id: string,
    @Body() disassociateProfessionalDto: DisassociateProfessionalDto,
  ) {
    return this.professionalService.disassociateProfessional(
      id,
      disassociateProfessionalDto,
    );
  }
}
