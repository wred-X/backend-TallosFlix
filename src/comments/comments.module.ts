import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentService } from './shared/comment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './schemas/comment.schema';
import { SocketGateway } from '../socket/socket.gateway';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
  ],
  controllers: [CommentsController],
  providers: [CommentService, SocketGateway],
  exports: [CommentService],
})
export class CommentsModule {}
