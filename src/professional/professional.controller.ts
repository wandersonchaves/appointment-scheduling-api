import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { Professional } from './schemas/professional.schema';

@Controller('professional')
export class ProfessionalController {
  constructor(private readonly professionalService: ProfessionalService) {}

  @Post()
  async create(
    @Body() createProfessionalDto: CreateProfessionalDto,
  ): Promise<Professional> {
    return await this.professionalService.create(createProfessionalDto);
  }

  @Get()
  async findAll(): Promise<Professional[]> {
    return await this.professionalService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Professional> {
    return await this.professionalService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProfessionalDto: UpdateProfessionalDto,
  ): Promise<Professional> {
    return await this.professionalService.update(id, updateProfessionalDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Professional> {
    return await this.professionalService.remove(id);
  }
}
