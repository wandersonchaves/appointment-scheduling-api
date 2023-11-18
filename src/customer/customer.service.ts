import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ICustomer } from './schemas/customer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SharedService } from 'src/shared/services/association/association.service';
import { AssociationDto } from 'src/shared/services/association/dto/association.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private readonly customerModel: Model<ICustomer>,
    private readonly sharedService: SharedService,
  ) {}

  async create(
    createCustomerDto: CreateCustomerDto,
  ): Promise<ICustomer | { message: string; status: number }> {
    try {
      const newCustomer = new this.customerModel(createCustomerDto);
      return await newCustomer.save();
    } catch (error) {
      if (error.code === 11000 && error.keyPattern?.email) {
        return {
          message: 'O email já está em uso.',
          status: HttpStatus.CONFLICT,
        };
      }
      return {
        message: 'Ocorreu um erro ao salvar o novo cliente.',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  findAll(): Promise<ICustomer[]> {
    return this.customerModel.find().exec();
  }

  async findOne(id: string): Promise<ICustomer> {
    const customer = await this.customerModel.findById(id).exec();
    if (!customer) {
      throw new NotFoundException('Cliente não encontrado.');
    }
    return customer;
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<ICustomer> {
    const updateCustomer = await this.customerModel
      .findByIdAndUpdate(id, updateCustomerDto, { new: true })
      .exec();
    if (!updateCustomer) {
      throw new NotFoundException('Cliente não encontrado.');
    }
    return updateCustomer;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.customerModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Cliente não encontrado.');
    }
    return { message: 'Cliente excluído com sucesso.' };
  }

  async manageEntityAssociation(
    id: string,
    associationDto: AssociationDto,
    associationPropertyName: string,
    isAssociation: boolean,
  ) {
    const { associationId } = associationDto;

    const customer = await this.findOne(id);

    const associations = customer[associationPropertyName] || [];

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
          `Cliente já está ${
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
        `Cliente não está associado a este ${translatedEntityName}.`,
      );
    }

    customer[associationPropertyName] = associations;

    await customer.save();
    return customer;
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
  ): Promise<ICustomer | null> {
    return this.associateEntity(id, associateAppointmentDto, 'appointments');
  }

  async disassociateAppointment(
    id: string,
    disassociateAppointmentDto: AssociationDto,
  ): Promise<ICustomer | null> {
    return this.disassociateEntity(
      id,
      disassociateAppointmentDto,
      'appointments',
    );
  }

  async associateEstablishment(
    id: string,
    associateEstablishmentDto: AssociationDto,
  ): Promise<ICustomer | null> {
    return this.associateEntity(
      id,
      associateEstablishmentDto,
      'establishments',
    );
  }

  async disassociateEstablishment(
    id: string,
    disassociateEstablishmentDto: AssociationDto,
  ): Promise<ICustomer | null> {
    return this.disassociateEntity(
      id,
      disassociateEstablishmentDto,
      'establishments',
    );
  }
}
