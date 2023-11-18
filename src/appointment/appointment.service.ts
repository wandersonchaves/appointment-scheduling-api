import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAppointment } from './schemas/appointment.schema';
import { SharedService } from 'src/shared/services/association/association.service';
import { AssociationDto } from 'src/shared/services/association/dto/association.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel('Appointment')
    private readonly appointmentModel: Model<IAppointment>,
    private readonly sharedService: SharedService,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<IAppointment | { message: string; status: number }> {
    try {
      const createdAppointment = new this.appointmentModel(
        createAppointmentDto,
      );
      return createdAppointment.save();
    } catch (error) {
      return {
        message: 'Ocorreu um erro ao salvar o novo agendamento.',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
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

  async manageEntityAssociation(
    id: string,
    associationDto: AssociationDto,
    associationPropertyName: string,
    isAssociation: boolean,
  ) {
    const { associationId } = associationDto;

    const appointment = await this.findOne(id);

    const association = appointment[associationPropertyName];

    const translatedEntityName = this.sharedService.translateEntity(
      associationPropertyName,
    );

    if (association && association.associationId.toString() === associationId) {
      if (association.isDisabled && isAssociation) {
        association.isDisabled = false;
        association.associationDate = new Date();
      } else if (!association.isDisabled && !isAssociation) {
        association.isDisabled = true;
        association.disassociationDate = new Date();
      } else {
        throw new ConflictException(
          `Agendamento já está ${
            isAssociation ? 'associado' : 'desassociado'
          } a este ${translatedEntityName}.`,
        );
      }
    } else if (!association && isAssociation) {
      appointment[associationPropertyName] = {
        associationId,
        associationDate: new Date(),
        isDisabled: false,
      };
    } else if (
      association &&
      association.associationId.toString() !== associationId
    ) {
      throw new ConflictException(
        `Agendamento já está ${
          isAssociation ? 'associado' : 'desassociado'
        } a outro ${translatedEntityName}.`,
      );
    } else {
      throw new ConflictException('ERRO GENÉRICO');
    }

    await appointment.save();
    return appointment;
  }

  async associateEntity(
    id: string,
    associationDto: AssociationDto,
    associationPropertyName: string,
  ) {
    return this.manageEntityAssociation(
      id,
      associationDto,
      associationPropertyName,
      true,
    );
  }

  async disassociateEntity(
    id: string,
    disassociateDto: AssociationDto,
    associationPropertyName: string,
  ) {
    return this.manageEntityAssociation(
      id,
      disassociateDto,
      associationPropertyName,
      false,
    );
  }

  async associateCustomer(id: string, associateCustomerDto: AssociationDto) {
    return this.associateEntity(id, associateCustomerDto, 'customer');
  }

  async disassociateCustomer(
    id: string,
    disassociateCustomerDto: AssociationDto,
  ) {
    return this.disassociateEntity(id, disassociateCustomerDto, 'customer');
  }

  async associateEstablishment(
    id: string,
    associateEstablishmentDto: AssociationDto,
  ) {
    return this.associateEntity(id, associateEstablishmentDto, 'establishment');
  }

  async disassociateEstablishment(
    id: string,
    disassociateEstablishmentDto: AssociationDto,
  ) {
    return this.disassociateEntity(
      id,
      disassociateEstablishmentDto,
      'establishment',
    );
  }

  async associateProfessional(
    id: string,
    associateProfessionalDto: AssociationDto,
  ) {
    return this.associateEntity(id, associateProfessionalDto, 'professional');
  }

  async disassociateProfessional(
    id: string,
    disassociateProfessionalDto: AssociationDto,
  ) {
    return this.disassociateEntity(
      id,
      disassociateProfessionalDto,
      'professional',
    );
  }

  async associateSchedule(id: string, associateScheduleDto: AssociationDto) {
    return this.associateEntity(id, associateScheduleDto, 'schedule');
  }

  async disassociateSchedule(
    id: string,
    disassociateScheduleDto: AssociationDto,
  ) {
    return this.disassociateEntity(id, disassociateScheduleDto, 'schedule');
  }

  async associateService(id: string, associateServiceDto: AssociationDto) {
    return this.associateEntity(id, associateServiceDto, 'service');
  }

  async disassociateService(
    id: string,
    disassociateServiceDto: AssociationDto,
  ) {
    return this.disassociateEntity(id, disassociateServiceDto, 'service');
  }
}
