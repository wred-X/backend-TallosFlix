import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Cast } from './model/cast';
import { Category } from './model/category';
import { Directors } from './model/directors';
import { Pages } from './model/pages';
import { updateMovie } from './model/update';
import { Movie } from './shared/movie';
import { MovieService } from './shared/movie.service';
@ApiTags('movies')
@ApiBearerAuth('JWT-auth')
@Controller('movies')
export class MoviesController {
  constructor(private movieService: MovieService) {}

  @Get()
  async getAll(): Promise<Movie[]> {
    return await this.movieService.getAll();
  }

  @Get('/count')
  async findAndCount() {
    return this.movieService.findAndCount();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Movie> {
    return await this.movieService.getById(id);
  }

  @Post()
  async create(@Body() movie: Movie): Promise<Movie> {
    return await this.movieService.create(movie);
  }

  @ApiBody({ type: Category })
  @Post('/category')
  async getCategory(@Body() genres: { category: string }): Promise<Movie[]> {
    return await this.movieService.getCategory(genres.category);
  }

  @ApiBody({ type: Directors })
  @Post('/directors')
  async getDirectors(
    @Body() directors: { director: string }
  ): Promise<Movie[]> {
    return await this.movieService.getDirectors(directors.director);
  }

  @ApiBody({ type: Cast })
  @Post('/cast')
  async getCast(@Body() cast: { actor: string }): Promise<Movie[]> {
    return await this.movieService.getCast(cast.actor);
  }

  @ApiBody({ type: Pages })
  @Post('/paginates')
  async findAndPaginate(@Body() pages: { limit: number; skip: number }) {
    return this.movieService.findAndPaginate(pages.limit, pages.skip);
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
