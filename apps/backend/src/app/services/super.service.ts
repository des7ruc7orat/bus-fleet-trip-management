import { Model, Document } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SuperService<T extends Document> {
  constructor(@InjectModel('') private readonly model: Model<T>) {}

  async create(data: Partial<T>): Promise<T> {
    const newEntity = new this.model(data);
    return newEntity.save();
  }

  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async findById(id: string): Promise<T> {
    return this.model.findById(id).exec();
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<T> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
