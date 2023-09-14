import { Injectable } from '@nestjs/common';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Establishment } from './schemas/establishment.schema';

@Injectable()
export class EstablishmentService {
  constructor(
    @InjectModel(Establishment.name)
    private readonly establishmentModel: Model<Establishment>,
  ) {}

  async create(
    createEstablishmentDto: CreateEstablishmentDto,
  ): Promise<Establishment> {
    try {
      const newEstablishment = new this.establishmentModel(
        createEstablishmentDto,
      );

      return await newEstablishment.save();
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
        return { message: 'O email já está em uso.', status: 409 } as any;
      }
    }
  }

  async findAll(): Promise<Establishment[]> {
    return await this.establishmentModel.find().exec();
  }

  async findOne(id: string): Promise<Establishment> {
    return await this.establishmentModel.findById(id).exec();
  }

  async update(
    id: string,
    updateEstablishmentDto: UpdateEstablishmentDto,
  ): Promise<Establishment> {
    return await this.establishmentModel
      .findByIdAndUpdate(id, updateEstablishmentDto, {
        new: true,
      })
      .exec();
  }

  async remove(id: string): Promise<Establishment> {
    return await this.establishmentModel.findByIdAndRemove(id).exec();
  }
}
