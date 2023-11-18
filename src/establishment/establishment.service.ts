import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IEstablishment } from './schemas/establishment.schema';
import { SharedService } from 'src/shared/services/association/association.service';
import { AssociationDto } from 'src/shared/services/association/dto/association.dto';

@Injectable()
export class EstablishmentService {
  constructor(
    @InjectModel('Establishment')
    private readonly establishmentModel: Model<IEstablishment>,
    private readonly sharedService: SharedService,
  ) {}

  async create(
    createEstablishmentDto: CreateEstablishmentDto,
  ): Promise<IEstablishment | { message: string; status: number }> {
    try {
      const createdEstablishment = new this.establishmentModel(
        createEstablishmentDto,
      );
      return await createdEstablishment.save();
    } catch (error) {
      if (error.code === 11000 && error.keyPattern?.email) {
        return {
          message: 'O email já está em uso.',
          status: HttpStatus.CONFLICT,
        };
      }
      return {
        message: 'Ocorreu um erro ao salvar o novo estabelecimento.',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async findAll(): Promise<IEstablishment[]> {
    return await this.establishmentModel.find().exec();
  }

  async findOne(id: string): Promise<IEstablishment> {
    const establishment = await this.establishmentModel.findById(id).exec();
    if (!establishment) {
      throw new NotFoundException('Estabelecimento não encontrado.');
    }
    return establishment;
  }

  async update(
    id: string,
    updateEstablishmentDto: UpdateEstablishmentDto,
  ): Promise<IEstablishment> {
    const updatedEstablishment = await this.establishmentModel
      .findByIdAndUpdate(id, updateEstablishmentDto, { new: true })
      .exec();
    if (!updatedEstablishment) {
      throw new NotFoundException('Estabelecimento não encontrado.');
    }
    return updatedEstablishment;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.establishmentModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Estabelecimento não encontrado.');
    }
    return { message: 'Estabelecimento excluído com sucesso.' };
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
          `Estabelecimento já está ${
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
        `Estabelecimento não está associado a este ${translatedEntityName}.`,
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

  async associateCustomer(id: string, associateCustomerDto: AssociationDto) {
    return this.associateEntity(id, associateCustomerDto, 'customers');
  }

  async disassociateCustomer(
    id: string,
    disassociateCustomerDto: AssociationDto,
  ) {
    return this.disassociateEntity(id, disassociateCustomerDto, 'customers');
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
