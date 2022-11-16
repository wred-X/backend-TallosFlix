import { PeopleService } from './service/people.service';
import { PeoplesController } from './controllers/peoples.controller';
import { Module } from '@nestjs/common';
import { PeopleSchema } from './schemas/people.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'People', schema: PeopleSchema }]),
  ],
  controllers: [PeoplesController],
  providers: [PeopleService],
  exports: [PeopleService],
})
export class PeoplesModule {}
