import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './movie';

@Injectable()
export class MovieService {
  @InjectModel('Movie') private readonly movieModel: Model<Movie>;

  async getAll() {
    return await this.movieModel
      .find({ type: 'movie' })
      .limit(500)
      .sort({ year: -1 })
      .exec();
  }

  async getAllSeries() {
    return await this.movieModel
      .find({ type: 'series' })
      .limit(500)
      .sort({ year: -1 })
      .exec();
  }

  async getById(id: string) {
    return await this.movieModel.findById(id).exec();
  }

  async create(movie: Movie) {
    const createdMovie = new this.movieModel(movie);
    return await createdMovie.save();
  }

  async getCategory(value: string) {
    const genre = value;
    const findMovies = await this.movieModel
      .find({
        genres: { $regex: genre, $options: 'i' },
      })
      .limit(500)
      .sort({ year: -1 });
    return findMovies;
  }

  async getCast(value: string) {
    const actors = value;
    const findMovies = await this.movieModel.find({
      cast: { $regex: actors, $options: 'i' },
    });
    return findMovies;
  }

  async getDirectors(value: string) {
    const director = value;
    const findMovies = await this.movieModel.find({
      directors: { $regex: director, $options: 'i' },
    });
    return findMovies;
  }

  async getLetter(value: string) {
    const letter = value;
    const letters = await this.movieModel
      .find({
        title: { $regex: '^' + letter, $options: 'i' },
        type: 'movie',
      })
      .limit(500)
      .sort({ year: -1 });
    return letters;
  }

  async getByYear(value: number) {
    const year = value;
    const findYear = await this.movieModel.find({
      year: year,
    });
    return findYear;
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
