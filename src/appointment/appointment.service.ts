import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAppointment } from './schemas/appointment.schema';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel('Appointment')
    private readonly appointmentModel: Model<IAppointment>,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<IAppointment> {
    const createdAppointment = new this.appointmentModel(createAppointmentDto);
    return createdAppointment.save();
  }

  findAll(): Promise<IAppointment[]> {
    return this.appointmentModel.find().exec();
  }

  async findOne(id: string): Promise<IAppointment> {
    const appointment = await this.appointmentModel.findById(id).exec();
    if (!appointment) {
      throw new NotFoundException('Agendamento não encontrado.');
    }
    return appointment;
  }

  async update(
    id: string,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<IAppointment> {
    const updatedAppointment = await this.appointmentModel
      .findByIdAndUpdate(id, updateAppointmentDto, { new: true })
      .exec();
    if (!updatedAppointment) {
      throw new NotFoundException('Agendamento não encontrado.');
    }
    return updatedAppointment;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.appointmentModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Agendamento não encontrado.');
    }
    return { message: 'Agendamento excluído com sucesso.' };
  }
}
