import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './movie';

@Injectable()
export class MovieService {
  @InjectModel('Movie') private readonly movieModel: Model<Movie>;

  async getAll() {
    return await this.movieModel.find().limit(500).sort({ year: -1 }).exec();
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
      .limit(500);
    return category;
  }

  async getCast(actor: string) {
    const atores = actor;
    const ator = await this.movieModel.find({
      cast: { $all: [atores] },
    });
    return ator;
  }
  async getDirectors(director: string) {
    const directores = director;
    const diretor = await this.movieModel.find({
      directors: { $all: [directores] },
    });
    return diretor;
  }

  async findAndCount() {
    return await this.movieModel.find().count();
  }

  async findAndPaginate(limit: number, skip: number) {
    const skipValue = limit * (skip - 1);
    return this.movieModel.find().limit(limit).skip(skipValue);
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
