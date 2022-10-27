import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LikesController } from './likes.controller';
import { likeSchema } from './schemas/like';
import { LikesService } from './shared/likes.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Likes', schema: likeSchema }])],
  controllers: [LikesController],
  providers: [LikesService],
  exports: [LikesService],
})
export class LikesModule {}
