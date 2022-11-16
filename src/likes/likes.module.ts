import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsModule } from 'src/comments/comments.module';
import { SocketGateway } from '../socket/socket.gateway';
import { LikesController } from './controllers/likes.controller';
import { likeSchema } from './schemas/like';
import { LikesService } from './services/likes.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Likes', schema: likeSchema }]),
    forwardRef(() => CommentsModule),
  ],
  controllers: [LikesController],
  providers: [LikesService, SocketGateway],
  exports: [LikesService],
})
export class LikesModule {}
