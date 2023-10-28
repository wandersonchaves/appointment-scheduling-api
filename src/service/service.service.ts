import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IService } from './schemas/service.schema';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel('Service')
    private readonly serviceModel: Model<IService>,
  ) {}

  async create(
    createServiceDto: CreateServiceDto,
  ): Promise<IService | { message: string; status: number }> {
    try {
      const newService = new this.serviceModel(createServiceDto);
      return await newService.save();
    } catch (error) {
      return {
        message: 'Ocorreu um erro ao salvar o novo serviço.',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async findAll(): Promise<IService[]> {
    return await this.serviceModel.find().exec();
  }

  async findOne(id: string): Promise<IService> {
    const service = await this.serviceModel.findById(id).exec();
    if (!service) {
      throw new NotFoundException('Serviço não encontrado.');
    }
    return service;
  }

  async update(
    id: string,
    updateServiceDto: UpdateServiceDto,
  ): Promise<IService> {
    const updatedService = await this.serviceModel
      .findByIdAndUpdate(id, updateServiceDto, { new: true })
      .exec();
    if (!updatedService) {
      throw new NotFoundException('Serviço não encontrado.');
    }
    return updatedService;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.serviceModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Serviço não encontrado.');
    }
    return { message: 'Serviço excluído com sucesso.' };
  }
}
