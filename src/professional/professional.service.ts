import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProfessional } from './schemas/professional.schema';

@Injectable()
export class ProfessionalService {
  constructor(
    @InjectModel('Professional')
    private readonly professionalModel: Model<IProfessional>,
  ) {}

  async create(
    createProfessionalDto: CreateProfessionalDto,
  ): Promise<IProfessional> {
    try {
      const newProfessional = new this.professionalModel(createProfessionalDto);
      return await newProfessional.save();
    } catch (error) {
      if (error.code === 11000 && error.keyPattern?.email) {
        throw new HttpException('O email já está em uso.', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'Ocorreu um erro ao salvar o novo profissional.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<IProfessional[]> {
    return await this.professionalModel.find().exec();
  }

  async findOne(id: string): Promise<IProfessional> {
    const professional = await this.professionalModel.findById(id).exec();
    if (!professional) {
      throw new NotFoundException('Profissional não encontrado.');
    }
    return professional;
  }

  async update(
    id: string,
    updateProfessionalDto: UpdateProfessionalDto,
  ): Promise<IProfessional> {
    const updateCustomer = await this.professionalModel
      .findByIdAndUpdate(id, updateProfessionalDto, { new: true })
      .exec();
    if (!updateCustomer) {
      throw new NotFoundException('Profissional não encontrado.');
    }
    return updateCustomer;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.professionalModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Profissional não encontrado.');
    }
    return { message: 'Profissional excluído com sucesso.' };
  }
}
