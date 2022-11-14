/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FavoritesController } from './controller/favorites.controller';
import { FavoriteSchema } from './schemas/favorites.schema';
import { FavoriteService } from './service/favorite.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Favorite', schema: FavoriteSchema }]),
  ],
  controllers: [FavoritesController],
  providers: [FavoriteService],
})
export class FavoritesModule {}
