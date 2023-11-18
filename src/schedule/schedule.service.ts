import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISchedule } from './schemas/schedule.schema';
import { SharedService } from 'src/shared/services/association/association.service';
import { AssociationDto } from 'src/shared/services/association/dto/association.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel('Schedule')
    private readonly scheduleModel: Model<ISchedule>,
    private readonly sharedService: SharedService,
  ) {}

  async create(
    createScheduleDto: CreateScheduleDto,
  ): Promise<ISchedule | { message: string; status: number }> {
    try {
      const newSchedule = new this.scheduleModel(createScheduleDto);
      return await newSchedule.save();
    } catch (error) {
      return {
        message: 'Ocorreu um erro ao salvar o novo horário.',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
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

  async manageEntityAssociation(
    id: string,
    associationDto: AssociationDto,
    associationPropertyName: string,
    isAssociation: boolean,
  ) {
    const { associationId } = associationDto;

    const establishment = await this.findOne(id);

    const associations = establishment[associationPropertyName] || [];

    const translatedEntityName = this.sharedService.translateEntity(
      associationPropertyName,
    );

    const existingAssociation = associations.find(
      (association) => association.associationId.toString() === associationId,
    );

    if (existingAssociation) {
      if (existingAssociation.isDisabled && isAssociation) {
        existingAssociation.isDisabled = false;
        existingAssociation.associationDate = new Date();
      } else if (!existingAssociation.isDisabled && !isAssociation) {
        existingAssociation.isDisabled = true;
        existingAssociation.disassociationDate = new Date();
      } else {
        throw new ConflictException(
          `Horário já está ${
            isAssociation ? 'associado' : 'desassociado'
          } a este ${translatedEntityName}.`,
        );
      }
    } else if (isAssociation) {
      const newAssociation = {
        associationId,
        associationDate: new Date(),
        isDisabled: false,
      };
      associations.push(newAssociation);
    } else {
      throw new ConflictException(
        `Profissional não está associado a este ${translatedEntityName}.`,
      );
    }

    establishment[associationPropertyName] = associations;

    await establishment.save();
    return establishment;
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

  async associateAppointment(
    id: string,
    associateAppointmentDto: AssociationDto,
  ) {
    return this.associateEntity(id, associateAppointmentDto, 'appointments');
  }

  async disassociateAppointment(
    id: string,
    disassociateAppointmentDto: AssociationDto,
  ) {
    return this.disassociateEntity(
      id,
      disassociateAppointmentDto,
      'appointments',
    );
  }

  async associateEstablishment(
    id: string,
    associateEstablishmentDto: AssociationDto,
  ) {
    return this.associateEntity(
      id,
      associateEstablishmentDto,
      'establishments',
    );
  }

  async disassociateEstablishment(
    id: string,
    disassociateEstablishmentDto: AssociationDto,
  ) {
    return this.disassociateEntity(
      id,
      disassociateEstablishmentDto,
      'establishments',
    );
  }

  async associateProfessional(
    id: string,
    associateProfessionalDto: AssociationDto,
  ) {
    return this.associateEntity(id, associateProfessionalDto, 'professionals');
  }

  async disassociateProfessional(
    id: string,
    disassociateProfessionalDto: AssociationDto,
  ) {
    return this.disassociateEntity(
      id,
      disassociateProfessionalDto,
      'professionals',
    );
  }

  async associateService(id: string, associateServiceDto: AssociationDto) {
    return this.associateEntity(id, associateServiceDto, 'services');
  }

  async disassociateService(
    id: string,
    disassociateServiceDto: AssociationDto,
  ) {
    return this.disassociateEntity(id, disassociateServiceDto, 'services');
  }
}
