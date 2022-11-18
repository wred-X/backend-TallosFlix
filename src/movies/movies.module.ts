import { Module } from '@nestjs/common';
import { MoviesController } from './controllers/movies.controller';
import { MovieService } from './services/movie.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema } from './schemas/movie.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]),
  ],
  controllers: [MoviesController],
  providers: [MovieService],
})
export class MoviesModule {}
