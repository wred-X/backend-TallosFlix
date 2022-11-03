import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rate } from '../models/rate';
import { Rating } from './rating';
import { ObjectId } from 'mongodb';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel('Rating') private readonly ratingModel: Model<Rating>
  ) {}

  async getAll() {
    try {
      return await this.ratingModel.find().exec();
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async getById(user_Id: string) {
    try {
      const ratingMovie = await this.ratingModel.find({
        allRate: { $elemMatch: { user_id: user_Id } },
      });
      return ratingMovie;
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async getRates(movieId: string) {
    const movie_id = new ObjectId(movieId);
    try {
      const rateInfo = await this.ratingModel.find({
        movie_id: movie_id,
      });
      return rateInfo;
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async getRating(movieId: string) {
    try {
      const allRates = await this.ratingModel.find({
        movie_id: movieId,
      });
      let soma = 0;
      for (let i = 0; i < allRates[0].allRate.length; i++) {
        soma += allRates[0].allRate[i].rate;
      }
      const rate = soma / allRates[0].allRate.length;
      return rate;
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async create(rating: Rating) {
    try {
      const createdTheater = this.ratingModel.create(rating);
      return await createdTheater;
    } catch (error) {
      throw new HttpException('Check all datas', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async addRate(id: string, rating: Rate) {
    try {
      return await this.ratingModel.findByIdAndUpdate(
        { _id: id },
        {
          $push: { allRate: rating },
        },
        {
          new: true,
        }
      );
    } catch (error) {
      throw new HttpException('Check user_id data', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async delete(id: string, rating: Rate) {
    const user_Id = rating.user_id;
    console.log(rating);
    try {
      return await this.ratingModel.findByIdAndUpdate(
        { _id: id },
        {
          $pull: { allRate: { user_id: user_Id, rate: { $lt: 6 } } },
        },
        {
          new: true,
        }
      );
    } catch (error) {
      throw new HttpException('Check user_id data', HttpStatus.NOT_FOUND);
    }
  }
}
