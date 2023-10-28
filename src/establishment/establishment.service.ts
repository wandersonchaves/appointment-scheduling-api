import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IEstablishment } from './schemas/establishment.schema';

@Injectable()
export class EstablishmentService {
  constructor(
    @InjectModel('Establishment')
    private readonly establishmentModel: Model<IEstablishment>,
  ) {}

  async create(
    createEstablishmentDto: CreateEstablishmentDto,
  ): Promise<IEstablishment | { message: string; status: number }> {
    try {
      return await this.establishmentModel.create(createEstablishmentDto);
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
        return { message: 'O email já está em uso.', status: 409 };
      }
      throw error;
    }
  }

  async findAll(): Promise<IEstablishment[]> {
    return await this.establishmentModel.find().exec();
  }

  async findOne(id: string): Promise<IEstablishment> {
    const establishment = await this.establishmentModel.findById(id).exec();
    if (!establishment) {
      throw new NotFoundException('Estabelecimento não encontrado.');
    }
    return establishment;
  }

  async update(
    id: string,
    updateEstablishmentDto: UpdateEstablishmentDto,
  ): Promise<IEstablishment> {
    const updatedEstablishment = await this.establishmentModel
      .findByIdAndUpdate(id, updateEstablishmentDto, { new: true })
      .exec();
    if (!updatedEstablishment) {
      throw new NotFoundException('Estabelecimento não encontrado.');
    }
    return updatedEstablishment;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.establishmentModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Estabelecimento não encontrado.');
    }
    return { message: 'Estabelecimento excluído com sucesso.' };
  }
}
