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
    return await this.theaterModel.find();
  }

  async getById(id: string) {
    return await this.theaterModel.findById(id);
  }

  async getByLocation(coordinates1: number, coordinates2: number) {
    const teste = [coordinates1, coordinates2];
    const theaterSearch = await this.theaterModel.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [coordinates1, coordinates2],
          },
          spherical: true,
          distanceField: 'Distance',
          maxDistance: 20000,
          minDistance: 0,
        },
      },
      //  { $skip: 0 },
      //  { $limit: 2 },
    ]);
    return theaterSearch;
  }

  async create(theater: Theater) {
    const createdTheater = this.theaterModel.create(theater);
    return await createdTheater;
  }

  async update(id: string, theater: Theater) {
    return await this.theaterModel.findByIdAndUpdate(id, theater, {
      new: true,
    });
  }

  async delete(id: string) {
    return await this.theaterModel.findByIdAndDelete({ _id: id });
  }
}
