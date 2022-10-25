import { Comment } from './shared/comment';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { eComment } from './model/emailComment';
import { MovieId } from './model/movieId';
import { CommentService } from './shared/comment.service';
import { CommentGetDto } from './shared/PaginationParams';

@ApiTags('comments')
@ApiBearerAuth('JWT-auth')
@Controller('comments')
export class CommentsController {
  constructor(private commentService: CommentService) {}

  @Get()
  async getAll(@Query() comment: CommentGetDto, pagination) {
    return await this.commentService.getAll(comment, pagination);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Comment> {
    return await this.commentService.getById(id);
  }

  @ApiBody({ type: MovieId })
  @Post('movie_id')
  async getByMovieId(@Body() movie_id: { movie: string }): Promise<Comment[]> {
    const comments = await this.commentService.getByMovieId(movie_id.movie);
    return comments;
  }

  @ApiBody({ type: eComment })
  @Post('mail')
  async getByEmail(@Body() email: { mail: string }): Promise<Comment[]> {
    const comments = await this.commentService.getByEmail(email.mail);
    return comments;
  }

  //reply
  @Put('/reply/:id')
  async replyComment(@Param('id') id: string, @Body() comment: Comment) {
    console.log('id deve ser o do comentario q to respondendo', id)
    return await this.commentService.updateReply(id, comment);
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
