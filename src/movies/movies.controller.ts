import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Movie } from './shared/movie';
import { MovieService } from './shared/movie.service';

@Controller('movies')
export class MoviesController {
  constructor(private movieService: MovieService) {}

  @Get()
  async getAll(): Promise<Movie[]> {
    return await this.movieService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Movie> {
    return await this.movieService.getById(id);
  }

  @Post()
  async create(@Body() movie: Movie): Promise<Movie> {
    return await this.movieService.create(movie);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() movie: Movie): Promise<Movie> {
    return this.movieService.update(id, movie);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.movieService.delete(id);
  }
}
