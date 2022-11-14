import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateFavorite } from '../model/update';
import { Favorite } from '../shared/favorite';
import { ObjectId } from 'mongodb';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel('Favorite') private readonly favoriteModel: Model<Favorite>
  ) {}

  async getAll() {
    try {
      return await this.favoriteModel.find().exec();
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async getById(user_Id: string) {
    const id = new ObjectId(user_Id);
    try {
      const favoriteMovie = await this.favoriteModel.find({ user_Id: id });
      return favoriteMovie;
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async create(favorite: Favorite) {
    try {
      const createdFavorite = this.favoriteModel.create(favorite);
      return await createdFavorite;
    } catch (error) {
      throw new HttpException('Check all datas', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async update(id: string, favorite: UpdateFavorite) {
    const user_id = new ObjectId(id);
    try {
      return await this.favoriteModel.findOneAndUpdate(
        { user_Id: user_id },
        {
          $push: { movie_Id: favorite.movie_Id },
        },
        {
          new: true,
        }
      );
    } catch (error) {
      throw new HttpException('Check movie_id data', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async delete(id: string, favorite: UpdateFavorite) {
    const user_id = new ObjectId(id);
    try {
      return await this.favoriteModel.findOneAndUpdate(
        { user_Id: user_id },
        {
          $pull: { movie_Id: { $in: favorite.movie_Id } },
        },
        {
          new: true,
        }
      );
    } catch (error) {
      throw new HttpException('Check movie_id data', HttpStatus.NOT_FOUND);
    }
  }
}
