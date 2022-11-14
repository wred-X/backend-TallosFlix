import { Role } from '../../autentications/models/role.enum';
import { RolesGuard } from '../../autentications/guards/role.guard';
/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { UpdateFavorite } from '../model/update';
import { Favorite } from '../shared/favorite';
import { FavoriteService } from '../service/favorite.service';
import { Roles } from '../../autentications/decorators/role-decorator';

@ApiTags('favorites')
@ApiBearerAuth('JWT-auth')
@Controller('favorites')
export class FavoritesController {
  constructor(private favoriteService: FavoriteService) {}

  @Get()
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(RolesGuard)
  async getAll(): Promise<Favorite[]> {
    return await this.favoriteService.getAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(RolesGuard)
  async getById(@Param('id') user_Id: string): Promise<Favorite[]> {
    return await this.favoriteService.getById(user_Id);
  }

  @Post()
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(RolesGuard)
  async create(@Body() favorite: Favorite): Promise<Favorite> {
    console.log(favorite);
    return await this.favoriteService.create(favorite);
  }

  @ApiBody({ type: UpdateFavorite })
  @Put('/add/:id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(RolesGuard)
  async update(
    @Param('id') id: string,
    @Body() favorite: UpdateFavorite
  ): Promise<Favorite> {
    return this.favoriteService.update(id, favorite);
  }

  @ApiBody({ type: UpdateFavorite })
  @Put('/remove/:id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(RolesGuard)
  async delete(
    @Param('id') id: string,
    @Body() favorite: UpdateFavorite
  ): Promise<Favorite> {
    return this.favoriteService.delete(id, favorite);
  }
}
