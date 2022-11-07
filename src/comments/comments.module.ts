import { UsersModule } from 'src/users/users.module';
import { UserService } from 'src/users/shared/user.service';
import { Module, forwardRef } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentService } from './shared/comment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './schemas/comment.schema';
import { SocketGateway } from '../socket/socket.gateway';
@Module({
  imports: [
    forwardRef(()=> UsersModule),
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
  ],
  controllers: [CommentsController],
  providers: [CommentService, SocketGateway, UsersModule],
  exports:[CommentService]
})
export class CommentsModule {}
