import { Module } from '@nestjs/common';
import { TheaterService } from './services/theater.service';
import { TheatersController } from './controllers/theaters.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TheaterSchema } from './schemas/theater.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Theater', schema: TheaterSchema }]),
  ],
  controllers: [TheatersController],
  providers: [TheaterService],
})
export class TheatersModule {}
