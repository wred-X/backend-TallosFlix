/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Update } from './model/update';
import { Favorite } from './shared/favorite';
import { FavoriteService } from './shared/favorite.service';

@ApiTags('favorites')
@ApiBearerAuth('JWT-auth')
@Controller('favorites')
export class FavoritesController {
  constructor(private favoriteService: FavoriteService) {}

  @Get()
  async getAll(): Promise<Favorite[]> {
    return await this.favoriteService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') user_Id: string): Promise<Favorite[]> {
    return await this.favoriteService.getById(user_Id);
  }

  @Post()
  async create(@Body() favorite: Favorite): Promise<Favorite> {
    return await this.favoriteService.create(favorite);
  }

  @ApiBody({ type: Update })
  @Put('/add/:id')
  async update(@Param('id') id: string, @Body() favorite: Update) {
    return this.favoriteService.update(id, favorite);
  }

  @ApiBody({ type: Update })
  @Put('/remove/:id')
  async delete(@Param('id') id: string, @Body() favorite: Update) {
    return this.favoriteService.delete(id, favorite);
  }
}
