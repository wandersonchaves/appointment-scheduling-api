import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ICustomer } from './schemas/customer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private readonly customerModel: Model<ICustomer>,
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
}
