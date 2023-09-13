import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EstablishmentService } from './establishment.service';
import { CreateEstablishmentDTO } from './dto/create-establishment.dto';
import { UpdateEstablishmentDTO } from './dto/update-establishment.dto';
import { Establishment } from './schemas/establishment.schema';

@Controller('establishment')
export class EstablishmentController {
  constructor(private readonly establishmentService: EstablishmentService) {}

  @Post()
  async create(
    @Body() createEstablishmentDto: CreateEstablishmentDTO,
  ): Promise<Establishment> {
    return await this.establishmentService.create(createEstablishmentDto);
  }

  @Get()
  async findAll(): Promise<Establishment[]> {
    return await this.establishmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.establishmentService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEstablishmentDto: UpdateEstablishmentDTO,
  ) {
    return await this.establishmentService.update(id, updateEstablishmentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.establishmentService.remove(id);
  }
}
