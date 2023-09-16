import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './schemas/service.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service.name)
    private readonly serviceModel: Model<Service>,
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    try {
      const newService = new this.serviceModel(createServiceDto);

      return await newService.save();
    } catch (error) {
      return {
        message: 'Ocorreu um erro ao salvar o novo serviço.',
        error,
      } as any;
    }
  }

  async findAll(): Promise<Service[]> {
    return await this.serviceModel.find().exec();
  }

  async findOne(id: string): Promise<Service> {
    return await this.serviceModel.findById(id).exec();
  }

  async update(
    id: string,
    updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    return await this.serviceModel
      .findByIdAndUpdate(id, updateServiceDto, {
        new: true,
      })
      .exec();
  }

  async remove(id: string): Promise<Service> {
    return await this.serviceModel.findByIdAndRemove(id).exec();
  }
}
