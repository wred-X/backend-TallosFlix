import { Role } from '../../autentications/models/role.enum';
import { RolesGuard } from '../../autentications/guards/role.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParamData,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { updateMovie } from '../model/update';
import { Movie } from '../model/movie';
import { MovieService } from '../services/movie.service';
import { Roles } from '../../autentications/decorators/role-decorator';
import { IsPublic } from '../../autentications/decorators/is-public-decorator';
import { Pages } from '../model/pages';
@ApiTags('movies')
@ApiBearerAuth('JWT-auth')
@Controller('movies')
export class MoviesController {
  constructor(private movieService: MovieService) {}

  @IsPublic()
  @Get()
  async getAll(movies: Movie) {
    return await this.movieService.getMovies(movies, {});
  }

  @IsPublic()
  @Get('/search')
  async findOne(@Query() query) {
    const findOne = await this.movieService.findByMovieId(query);
    return findOne;
  }

  @IsPublic()
  @Get('/search/series')
  async findSeries(@Query() querySeries) {
    const findSerie = await this.movieService.findByMovieId(
      querySeries,
      'series'
    );
    return findSerie;
  }
  @Get('/search/:id')
  async findMovieById(@Query() pagination: Pages, @Param('id') id: string) {
    const findMovieById = await this.movieService.findById(pagination, id);
    return findMovieById;
  }
  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async create(@Body() movie: Movie) {
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
