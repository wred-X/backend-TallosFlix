import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pages } from '../model/pages';
import { updateMovie } from '../model/update';
import { Movie } from '../model/movie';

@Injectable()
export class MovieService {
  @InjectModel('Movie') private readonly movieModel: Model<Movie>;

  async getMovies(movies: Movie, pagination) {
    try {
      const sortValue = pagination.sortValue || -1;
      const limit = pagination.limit || 10;
      const currentPage = pagination.page || 1;
      const skip = limit * (currentPage - 1);

      const total = await this.movieModel.countDocuments(movies);
      const qtdPages = Math.floor(total / pagination.limit) + 1;

      const content = await this.movieModel
        .find(movies)
        .limit(limit)
        .sort({ year: sortValue })
        .skip(skip);
      return {
        content,
        numberOfElements: total,
        pagesTotal: qtdPages,
        page: pagination.page || 1,
      };
    } catch {
      new Error('Bad Request');
    }
  }

  async findByMovieId(
    query: {
      search: string | number;
      field: string;
      page: number;
      limit: number;
      sortValue: number;
    },
    type: string = 'movie'
  ) {
    try {
      const field = query.field || 'title';

      const queryMongo = {
        type,
        [field]:
          field === 'year'
            ? Number(query.search)
            : { $regex: query.search || '', $options: 'i' },
      } as unknown as Movie;

      return this.getMovies(queryMongo, {
        page: query.page || 1,
        limit: query.limit || 10,
        sortValue: query.sortValue || -1,
      });
    } catch {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async findById(pagination: Pages, id: string) {
    const limit = pagination.limit || 5;
    const currentPage = pagination.page || 1;
    const skip = limit * (currentPage - 1);

    const total = await this.movieModel.countDocuments();
    const qtdPages = Math.floor(total / pagination.limit) + 1;

    const result = await this.movieModel.findById(id).limit(limit).skip(skip);

    return {
      result,
      numberOfElements: total,
      pagesTotal: qtdPages,
      page: pagination.page || 1,
    };
  }

  async create(movie: Movie) {
    try {
      const createdMovie = new this.movieModel(movie);
      return await createdMovie.save();
    } catch {
      throw new HttpException(
        'Bad Request, Check datas',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async update(id: string, movie: updateMovie) {
    try {
      return await this.movieModel.findByIdAndUpdate(id, movie, {
        new: true,
      });
    } catch {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async delete(id: string) {
    try {
      return await this.movieModel.findByIdAndDelete({ _id: id }).exec();
    } catch {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
