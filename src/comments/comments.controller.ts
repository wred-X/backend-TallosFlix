import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Comment } from './shared/comment';
import { CommentService } from './shared/comment.service';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private commentService: CommentService) {}

  @Get()
  async getAll(): Promise<Comment[]> {
    return await this.commentService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Comment> {
    return await this.commentService.getById(id);
  }

  @Get('movie_id/:movie_id')
  async getByMovieId(@Param('movie_id') movie_id: string): Promise<Comment[]> {
    const comments = await this.commentService.getByMovieId(movie_id);
    return comments;
  }

  @Post()
  async create(@Body() comment: Comment): Promise<Comment> {
    return await this.commentService.create(comment);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() comment: Comment
  ): Promise<Comment> {
    return this.commentService.update(id, comment);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.commentService.delete(id);
  }
}
