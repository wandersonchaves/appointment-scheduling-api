import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISchedule } from './schemas/schedule.schema';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel('Schedule')
    private readonly scheduleModel: Model<ISchedule>,
  ) {}

  async create(createScheduleDto: CreateScheduleDto): Promise<ISchedule> {
    try {
      const newSchedule = new this.scheduleModel(createScheduleDto);
      return await newSchedule.save();
    } catch (error) {
      return {
        message: 'Ocorreu um erro ao salvar o novo horário.',
        error,
      } as any;
    }
  }

  async findAll(): Promise<ISchedule[]> {
    return await this.scheduleModel.find().exec();
  }

  async findOne(id: string): Promise<ISchedule> {
    const schedule = await this.scheduleModel.findById(id).exec();
    if (!schedule) {
      throw new NotFoundException('Horário não encontrado.');
    }
    return schedule;
  }

  async update(
    id: string,
    updateScheduleDto: UpdateScheduleDto,
  ): Promise<ISchedule> {
    const updatedSchedule = await this.scheduleModel
      .findByIdAndUpdate(id, updateScheduleDto, { new: true })
      .exec();
    if (!updatedSchedule) {
      throw new NotFoundException('Horário não encontrado.');
    }
    return updatedSchedule;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.scheduleModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Horário não encontrado.');
    }
    return { message: 'Horário excluído com sucesso.' };
  }
}
