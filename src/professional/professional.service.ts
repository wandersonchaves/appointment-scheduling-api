import { Injectable } from '@nestjs/common';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Professional } from './schemas/professional.schema';

@Injectable()
export class ProfessionalService {
  constructor(
    @InjectModel(Professional.name)
    private readonly professionalModel: Model<Professional>,
  ) {}

  async create(
    createProfessionalDto: CreateProfessionalDto,
  ): Promise<Professional> {
    try {
      const newProfessional = new this.professionalModel(createProfessionalDto);

      return await newProfessional.save();
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
        return { message: 'O email já está em uso.', status: 409 } as any;
      }
    }
  }

  async findAll(): Promise<Professional[]> {
    return await this.professionalModel.find().exec();
  }

  async findOne(id: string): Promise<Professional> {
    return await this.professionalModel.findById(id).exec();
  }

  async update(
    id: string,
    updateProfessionalDto: UpdateProfessionalDto,
  ): Promise<Professional> {
    return await this.professionalModel
      .findByIdAndUpdate(id, updateProfessionalDto, {
        new: true,
      })
      .exec();
  }

  async remove(id: string): Promise<Professional> {
    return await this.professionalModel.findByIdAndRemove(id).exec();
  }
}
