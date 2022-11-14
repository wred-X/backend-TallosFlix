import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RatingsController } from './controller/ratings.controller';
import { RatingSchema } from './schemas/ratings.schema';
import { RatingService } from './service/rating.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Rating', schema: RatingSchema }]),
  ],
  controllers: [RatingsController],
  providers: [RatingService],
})
export class RatingsModule {}
