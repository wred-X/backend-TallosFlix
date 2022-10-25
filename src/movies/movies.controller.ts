import { Role } from './../autentications/models/role.enum';
import { RolesGuard } from './../autentications/guards/role.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { updateMovie } from './model/update';
import { Movie } from './shared/movie';
import { MovieService } from './shared/movie.service';
import { Roles } from 'src/autentications/decorators/role-decorator';
@ApiTags('movies')
@ApiBearerAuth('JWT-auth')
@Controller('movies')
export class MoviesController {
  constructor(private movieService: MovieService) { }

  @Get()
  async getAll(movies: Movie) {
    return await this.movieService.getMovies(movies, {});
  }

  @Get('/search')
  async findOne(@Query() query) {
    const findOne = await this.movieService.findByMovieId(query);
    return findOne;
  }

  @Get('/search/series')
  async findSeries(@Query() querySeries) {
    const findSerie = await this.movieService.findByMovieId(
      querySeries,
      'series'
    );
    return findSerie;
  }

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async create(@Body() movie: Movie): Promise<Movie> {
    return await this.movieService.create(movie);
  }

  @Put(':id') 
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async update(
    @Param('id') id: string,
    @Body() movie: updateMovie
  ): Promise<Movie> {
    return this.movieService.update(id, movie);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async delete(@Param('id') id: string) {
    return await this.movieService.delete(id);
  }
}
