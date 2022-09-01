import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentService } from './shared/comment.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentService],
})
export class CommentsModule {}
