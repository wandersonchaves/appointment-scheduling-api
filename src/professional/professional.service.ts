import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProfessional } from './schemas/professional.schema';
import { SharedService } from 'src/shared/services/association/association.service';
import { AssociationDto } from 'src/shared/services/association/dto/association.dto';

@Injectable()
export class ProfessionalService {
  constructor(
    @InjectModel('Professional')
    private readonly professionalModel: Model<IProfessional>,
    private readonly sharedService: SharedService,
  ) {}

  async create(
    createProfessionalDto: CreateProfessionalDto,
  ): Promise<IProfessional | { message: string; status: number }> {
    try {
      const newProfessional = new this.professionalModel(createProfessionalDto);
      return await newProfessional.save();
    } catch (error) {
      if (error.code === 11000 && error.keyPattern?.email) {
        return {
          message: 'O email já está em uso.',
          status: HttpStatus.CONFLICT,
        };
      }
      return {
        message: 'Ocorreu um erro ao salvar o novo profissional.',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
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
    const updateProfessional = await this.professionalModel
      .findByIdAndUpdate(id, updateProfessionalDto, { new: true })
      .exec();
    if (!updateProfessional) {
      throw new NotFoundException('Profissional não encontrado.');
    }
    return updateProfessional;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.professionalModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Profissional não encontrado.');
    }
    return { message: 'Profissional excluído com sucesso.' };
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
          `Profissional já está ${
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

  async associateSchedule(id: string, associateScheduleDto: AssociationDto) {
    return this.associateEntity(id, associateScheduleDto, 'schedules');
  }

  async disassociateSchedule(
    id: string,
    disassociateScheduleDto: AssociationDto,
  ) {
    return this.disassociateEntity(id, disassociateScheduleDto, 'schedules');
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
