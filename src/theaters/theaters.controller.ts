import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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

  @Post('/geoSearch')
  async getByLocation(
    @Body() cord: { lat: number; long: number }
  ): Promise<Theater[]> {
    console.log(cord);
    console.log(cord.lat);
    console.log(cord.long);
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
