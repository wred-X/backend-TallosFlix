import { Role } from '../../autentications/models/role.enum';
import { RolesGuard } from '../../autentications/guards/role.guard';
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
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Coordinates } from '../model/coordinates';
import { updateTheater } from '../model/updateTheater';
import { Theater } from '../shared/theater';
import { TheaterService } from '../services/theater.service';
import { Roles } from '../../autentications/decorators/role-decorator';
import { IsPublic } from '../../autentications/decorators/is-public-decorator';

@ApiTags('theaters')
@ApiBearerAuth('JWT-auth')
@Controller('theaters')
export class TheatersController {
  constructor(private theaterService: TheaterService) {}

  @IsPublic()
  @Get()
  async getAll(): Promise<Theater[]> {
    return await this.theaterService.getAll();
  }
  @IsPublic()
  @Get(':id')
  async getById(@Param('id') id: string): Promise<Theater> {
    return await this.theaterService.getById(id);
  }
  @IsPublic()
  @ApiBody({ type: Coordinates })
  @Post('/geoSearch')
  async getByLocation(
    @Body() cord: { lat: number; long: number }
  ): Promise<Theater[]> {
    return await this.theaterService.getByLocation(cord.lat, cord.long);
  }

  @IsPublic()
  @Get('/city/:address')
  async getAddress(@Param('address') address: string): Promise<Theater[]> {
    return await this.theaterService.getAddress(address);
  }

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async create(@Body() theater: updateTheater): Promise<updateTheater> {
    return await this.theaterService.create(theater);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async update(
    @Param('id') id: string,
    @Body() theater: updateTheater
  ): Promise<updateTheater> {
    return this.theaterService.update(id, theater);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async delete(@Param('id') id: string) {
    return await this.theaterService.delete(id);
  }
}
