import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { People } from '../shared/people';

@Injectable()
export class PeopleService {
  constructor(
    @InjectModel('People') private readonly peopleModel: Model<People>
  ) {}

  async getAll() {
    try {
      return await this.peopleModel.find().exec();
    } catch {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async getByName(nameKey: string) {
    console.log(nameKey);
    try {
      return await this.peopleModel.find({
        name: { $regex: nameKey, $options: 'i' },
      });
    } catch {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async create(people: People) {
    try {
      const createdPeople = new this.peopleModel(people);
      const newPeople = await createdPeople.save();
      return newPeople;
    } catch {
      throw new HttpException('Check all datas', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async update(nameKey: string, people: People) {
    try {
      return await this.peopleModel.findByIdAndUpdate(
        {
          name: { $regex: nameKey, $options: 'i' },
        },
        people,
        {
          new: true,
        }
      );
    } catch {
      throw new HttpException('Check all datas', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async delete(id: string) {
    try {
      return await this.peopleModel.findByIdAndDelete({ _id: id }).exec();
    } catch {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
