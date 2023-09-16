import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './schemas/service.schema';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  async create(@Body() createServiceDto: CreateServiceDto): Promise<Service> {
    return await this.serviceService.create(createServiceDto);
  }

  @Get()
  async findAll(): Promise<Service[]> {
    return await this.serviceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Service> {
    return await this.serviceService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    return await this.serviceService.update(id, updateServiceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Service> {
    return await this.serviceService.remove(id);
  }
}
