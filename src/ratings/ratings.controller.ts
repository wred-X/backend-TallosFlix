import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Rate } from './models/rate';
import { Rating } from './shared/rating';
import { RatingService } from './shared/rating.service';

@ApiTags('ratings')
@ApiBearerAuth('JWT-auth')
@Controller('ratings')
export class RatingsController {
  constructor(private ratingService: RatingService) {}

  @Get()
  async getAll(): Promise<Rating[]> {
    return await this.ratingService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') user_Id: string): Promise<Rating[]> {
    return await this.ratingService.getById(user_Id);
  }

  @Get('movie/:id')
  async getRates(@Param('id') movieId: string): Promise<Rating[]> {
    return await this.ratingService.getRates(movieId);
  }

  @Get('rate/:id')
  async getRating(@Param('id') movieId: string): Promise<number> {
    return await this.ratingService.getRating(movieId);
  }

  @Post()
  async create(@Body() rating: Rating): Promise<Rating> {
    return await this.ratingService.create(rating);
  }

  @ApiBody({ type: Rate })
  @Put('/add/:id')
  async addRate(
    @Param('id') id: string,
    @Body() rating: Rate
  ): Promise<Rating> {
    return this.ratingService.addRate(id, rating);
  }

  @ApiBody({ type: Rate })
  @Put('/remove/:id')
  async delete(@Param('id') id: string, @Body() rating: Rate): Promise<Rating> {
    return this.ratingService.delete(id, rating);
  }
  //Talvez essa rota remove seja inutil.

  @ApiBody({ type: Rate })
  @Put('/update/:id')
  async update(@Param('id') id: string, @Body() rating: Rate): Promise<Rating> {
    await this.ratingService.delete(id, rating);
    return this.ratingService.addRate(id, rating);
  }
}
