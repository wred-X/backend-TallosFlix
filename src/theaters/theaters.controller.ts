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
import { Coordinates } from './model/coordinates';
import { Theater } from './shared/theater';
import { TheaterService } from './shared/theater.service';

@ApiTags('theaters')
@ApiBearerAuth('JWT-auth')
@Controller('theaters')
export class TheatersController {
  constructor(private theaterService: TheaterService) {}

  @Get()
  async getAll(): Promise<Theater[]> {
    return await this.theaterService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Theater> {
    return await this.theaterService.getById(id);
  }

  @ApiBody({ type: Coordinates })
  @Post('/geoSearch')
  async getByLocation(
    @Body() cord: { lat: number; long: number }
  ): Promise<Theater[]> {
    return await this.theaterService.getByLocation(cord.lat, cord.long);
  }

  @Post()
  async create(@Body() theater: Theater): Promise<Theater> {
    return await this.theaterService.create(theater);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() theater: Theater
  ): Promise<Theater> {
    return this.theaterService.update(id, theater);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.theaterService.delete(id);
  }
}
