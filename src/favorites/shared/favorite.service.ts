import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateFavorite } from '../model/update';
import { Favorite } from './favorite';
import { ObjectId } from 'mongodb';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel('Favorite') private readonly favoriteModel: Model<Favorite>
  ) {}

  async getAll() {
    return await this.favoriteModel.find().exec();
  }

  async getById(user_Id: string) {
    const id = new ObjectId(user_Id);
    const favoriteMovie = await this.favoriteModel.find({ user_Id: id });
    return favoriteMovie;
  }

  async create(favorite: Favorite) {
    const createdTheater = this.favoriteModel.create(favorite);
    return await createdTheater;
  }

  async update(id: string, favorite: UpdateFavorite) {
    return await this.favoriteModel.findByIdAndUpdate(
      { _id: id },
      {
        $push: { movie_Id: favorite.movie_Id },
      },
      {
        new: true,
      }
    );
  }

  async delete(id: string, favorite: UpdateFavorite) {
    return await this.favoriteModel.findByIdAndUpdate(
      { _id: id },
      {
        $pull: { movie_Id: favorite.movie_Id },
      },
      {
        new: true,
      }
    );
  }
}
