import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Cast } from './model/cast';
import { Category } from './model/category';
import { Directors } from './model/directors';
import { Letter } from './model/letter';
import { Pages } from './model/pages';
import { updateMovie } from './model/update';
import { Year } from './model/year';
import { Movie } from './shared/movie';
import { MovieService } from './shared/movie.service';
@ApiTags('movies')
@ApiBearerAuth('JWT-auth')
@Controller('movies')
export class MoviesController {
  constructor(private movieService: MovieService) {}

  @Get()
  async getAll(movies: Movie) {
    return await this.movieService.getMovies(movies, {});
  }
  @Get('/search')
  async findOne(@Query() query) {
      const findOne = await this.movieService.findByMovieId(query);
      return findOne;
  
  }

  @Post()
  async create(@Body() movie: Movie): Promise<Movie> {
    return await this.movieService.create(movie);
  }


  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() movie: updateMovie
  ): Promise<Movie> {
    return this.movieService.update(id, movie);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.movieService.delete(id);
  }
}
