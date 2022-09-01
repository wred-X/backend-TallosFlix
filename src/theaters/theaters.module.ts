import { Module } from '@nestjs/common';
import { TheaterService } from './shared/theater.service';
import { TheatersController } from './theaters.controller';

@Module({
  controllers: [TheatersController],
  providers: [TheaterService],
})
export class TheatersModule {}
