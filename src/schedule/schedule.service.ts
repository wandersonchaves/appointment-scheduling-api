import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Schedule } from './schemas/schedule.schema';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Schedule.name)
    private readonly scheduleModel: Model<typeof Schedule>,
  ) {}

  async create(createScheduleDto: CreateScheduleDto): Promise<typeof Schedule> {
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

  async findAll(): Promise<(typeof Schedule)[]> {
    return await this.scheduleModel.find().exec();
  }

  async findOne(id: string): Promise<typeof Schedule> {
    return await this.scheduleModel.findById(id).exec();
  }

  async update(
    id: string,
    updateScheduleDto: UpdateScheduleDto,
  ): Promise<typeof Schedule> {
    return await this.scheduleModel
      .findByIdAndUpdate(id, updateScheduleDto, {
        new: true,
      })
      .exec();
  }

  async remove(id: string): Promise<typeof Schedule> {
    return await this.scheduleModel.findByIdAndRemove(id).exec();
  }
}
