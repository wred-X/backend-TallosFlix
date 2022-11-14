import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { SocketGateway } from '../socket/socket.gateway';
import { CommentsController } from './controller/comments.controller';
import { CommentSchema } from './schemas/comment.schema';
import { CommentService } from './service/comment.service';
@Module({
  imports: [
    forwardRef(() => UsersModule),
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
  ],
  controllers: [CommentsController],
  providers: [CommentService, SocketGateway, UsersModule],
  exports: [CommentService],
})
export class CommentsModule {}
