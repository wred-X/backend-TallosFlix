import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MovieService } from './shared/movie.service';

@Module({
  controllers: [MoviesController],
  providers: [MovieService],
})
export class MoviesModule {}
