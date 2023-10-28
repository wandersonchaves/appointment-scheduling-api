import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './schemas/customer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    try {
      const newCustomer = new this.customerModel(createCustomerDto);
      return await newCustomer.save();
    } catch (error) {
      if (error.code === 11000 && error.keyPattern?.email) {
        throw new HttpException('O email já está em uso.', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'Ocorreu um erro ao salvar o novo cliente.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll(): Promise<Customer[]> {
    return this.customerModel.find().exec();
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerModel.findById(id).exec();
    if (!customer) {
      throw new NotFoundException('Cliente não encontrado.');
    }
    return customer;
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
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
