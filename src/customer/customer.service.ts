import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './schemas/customer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name)
    private readonly customerModel: Model<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    try {
      const newEstablishment = new this.customerModel(createCustomerDto);

      return await newEstablishment.save();
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
        return { message: 'O email já está em uso.', status: 409 } as any;
      }
    }
  }

  async findAll(): Promise<Customer[]> {
    return await this.customerModel.find().exec();
  }

  async findOne(id: string): Promise<Customer> {
    return await this.customerModel.findById(id).exec();
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    return await this.customerModel
      .findByIdAndUpdate(id, updateCustomerDto, {
        new: true,
      })
      .exec();
  }

  async remove(id: string): Promise<Customer> {
    return await this.customerModel.findByIdAndRemove(id).exec();
  }
}
