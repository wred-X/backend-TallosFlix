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
import { People } from './shared/people';
import { PeopleService } from './shared/people.service';

@ApiTags('people')
@ApiBearerAuth('JWT-auth')
@Controller('people')
export class PeoplesController {
  constructor(private peopleService: PeopleService) {}

  @Get()
  async getAll(): Promise<People[]> {
    return await this.peopleService.getAll();
  }

  @Get(':name')
  async getById(@Param('name') name: string): Promise<People[]> {
    return await this.peopleService.getByName(name);
  }

  @Post()
  async create(@Body() people: People): Promise<People> {
    return await this.peopleService.create(people);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() people: People
  ): Promise<People> {
    return this.peopleService.update(id, people);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.peopleService.delete(id);
  }
}
