import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Theater } from './theater';

@Injectable()
export class TheaterService {
  constructor(
    @InjectModel('Theater') private readonly theaterModel: Model<Theater>
  ) {}

  async getAll() {
    return await this.theaterModel.find().exec();
  }

  async getById(id: string) {
    return await this.theaterModel.findById(id).exec();
  }

  async create(theater: Theater) {
    const createdTheater = new this.theaterModel(theater);
    return await createdTheater.save();
  }

  async update(id: string, theater: Theater) {
    return await this.theaterModel.findByIdAndUpdate(id, theater, {
      new: true,
    });
  }

  async delete(id: string) {
    return await this.theaterModel.findByIdAndDelete({ _id: id }).exec();
  }
}
