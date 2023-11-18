import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IService } from './schemas/service.schema';
import { SharedService } from 'src/shared/services/association/association.service';
import { AssociationDto } from 'src/shared/services/association/dto/association.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel('Service')
    private readonly serviceModel: Model<IService>,
    private readonly sharedService: SharedService,
  ) {}

  async create(
    createServiceDto: CreateServiceDto,
  ): Promise<IService | { message: string; status: number }> {
    try {
      const newService = new this.serviceModel(createServiceDto);
      return await newService.save();
    } catch (error) {
      return {
        message: 'Ocorreu um erro ao salvar o novo serviço.',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async findAll(): Promise<IService[]> {
    return await this.serviceModel.find().exec();
  }

  async findOne(id: string): Promise<IService> {
    const service = await this.serviceModel.findById(id).exec();
    if (!service) {
      throw new NotFoundException('Serviço não encontrado.');
    }
    return service;
  }

  async update(
    id: string,
    updateServiceDto: UpdateServiceDto,
  ): Promise<IService> {
    const updatedService = await this.serviceModel
      .findByIdAndUpdate(id, updateServiceDto, { new: true })
      .exec();
    if (!updatedService) {
      throw new NotFoundException('Serviço não encontrado.');
    }
    return updatedService;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.serviceModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Serviço não encontrado.');
    }
    return { message: 'Serviço excluído com sucesso.' };
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
          `Serviço já está ${
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
}
