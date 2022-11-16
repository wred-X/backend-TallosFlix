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
      const findRating = this.ratingModel.findById(rating.movie_id);
      !findRating
        ? this.ratingModel.create(rating)
        : this.ratingModel.findByIdAndUpdate(
            {
              movie_id: rating.movie_id,
              allRate: rating.allRate,
            },
            {
              allRate: rating.allRate,
            }
          );
    } catch (error) {
      throw new HttpException('Check all datas', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async addRate(movie_id: string, rating: Rate) {
    try {
      // const updateRating = await this.ratingModel.findOneAndUpdate(
      //   {
      //     movie_id: movie_id,
      //     allRate: { $elemMatch: {user_id: rating.user_id } },
      //   },
      //   {
      //     $push: { allRate: rating },
      //   }
      // );

      // return updateRating;
      const updateRating = await this.ratingModel.findOneAndUpdate(
        {
          movie_id: movie_id,
          'allRate.user_id': rating.user_id,
        },
        {
          allRate: rating,
        }
      );
      //esta atualizando, porém quando criamos um novo avaliação, n está inserindo dentro do array e sim criando ouro objeto
      // com o mesmo movie_id
      // allRate Array
      // encontrar o indice do array que possua esse userId
      // atualizar o rating usando o indx encontrado
      // salvar o novo array de rating

      return updateRating;
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
