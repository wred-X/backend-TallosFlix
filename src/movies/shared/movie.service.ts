import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './movie';

@Injectable()
export class MovieService {
  @InjectModel('Movie') private readonly movieModel: Model<Movie>;

  async getAll() {
    return await this.movieModel.find().exec();
  }

  async getById(id: string) {
    return await this.movieModel.findById(id).exec();
  }

  async create(movie: Movie) {
    const createdMovie = new this.movieModel(movie);
    return await createdMovie.save();
  }

  async getCategory(genre: string) {
    const genero = genre;
    const category = await this.movieModel
      .find({
        genres: { $all: [genero] },
      })
      .limit(20);
    return category;
  }

  async update(id: string, movie: Movie) {
    return await this.movieModel.findByIdAndUpdate(id, movie, {
      new: true,
    });
  }

  async delete(id: string) {
    return await this.movieModel.findByIdAndDelete({ _id: id }).exec();
  }
}
