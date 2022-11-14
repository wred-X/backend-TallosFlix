import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { updateTheater } from '../model/updateTheater';
import { Theater } from '../shared/theater';

@Injectable()
export class TheaterService {
  constructor(
    @InjectModel('Theater') private readonly theaterModel: Model<Theater>
  ) {}

  async getAll() {
    try {
      return await this.theaterModel.find();
    } catch {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async getById(id: string) {
    try {
      return await this.theaterModel.findById(id);
    } catch {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async getAddress(address: string) {
    try {
      return await this.theaterModel.find({
        'location.address.city': { $regex: address, $options: 'i' },
      });
    } catch {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async getByLocation(coordinates1: number, coordinates2: number) {
    try {
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
    } catch {
      throw new HttpException(
        'Coordinates type of numbers',
        HttpStatus.FORBIDDEN
      );
    }
  }
  async create(theater: updateTheater) {
    try {
      const createdTheater = this.theaterModel.create(theater);
      return await createdTheater;
    } catch {
      throw new HttpException('Check all datas', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async update(id: string, theater: updateTheater) {
    try {
      return await this.theaterModel.findByIdAndUpdate(id, theater, {
        new: true,
      });
    } catch {
      throw new HttpException('Check all datas', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async delete(id: string) {
    try {
      return await this.theaterModel.findByIdAndDelete({ _id: id });
    } catch {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
