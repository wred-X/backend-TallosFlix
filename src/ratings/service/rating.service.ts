import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rate } from '../models/rate';
import { ObjectId } from 'mongodb';
import { Rating } from '../shared/rating';

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
      //caso n exista o movie_id registrado ele cria
      const findRating = await this.ratingModel.findOne({
        movie_id: rating.movie_id,
      });
      if (findRating) {
        await this.ratingModel.updateOne(
          {
            movie_id: findRating.movie_id,
          },
          {
            $push: { allRate: rating.allRate },
          }
        );
      }else{

        const createRating = await this.ratingModel.create({
          movie_id: rating.movie_id,
          allRate: rating.allRate,
        });
        return createRating;
      }
    } catch (error) {
      throw new HttpException('Check all datas', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async updateRate(movie_id: string, rating: Rate) {
    try {
      {
        await this.ratingModel.findOneAndUpdate(
          {
            movie_id: movie_id,

            'allRate.user_id': rating.user_id,
          },
          {
            $set: { 'allRate.$.rate': rating.rate },
          }
        );
      }
    } catch (error) {
      throw new HttpException('Check user_id data', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async delete(id: string, rating: Rate) {
    const user_Id = rating.user_id;
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
