import { RolesGuard } from './../autentications/guards/role.guard';
import { Comment } from './shared/comment';
import { Role } from './../autentications/models/role.enum';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { eComment } from './model/emailComment';
import { MovieId } from './model/movieId';
import { CommentService } from './shared/comment.service';
import { CommentGetDto } from './shared/PaginationParams';
import { Roles } from '../autentications/decorators/role-decorator';
import { IsPublic } from '../autentications/decorators/is-public-decorator';

@ApiTags('comments')
@ApiBearerAuth('JWT-auth')
@Controller('comments')
export class CommentsController {
  constructor(private commentService: CommentService) {}

  @IsPublic()
  @Get()
  async getAll(@Query() comment: CommentGetDto, pagination) {
    return await this.commentService.getAll(comment, pagination);
  }

  @IsPublic()
  @Get(':id')
  async getById(@Param('id') id: string): Promise<Comment> {
    return await this.commentService.getById(id);
  }

  @IsPublic()
  @ApiBody({ type: MovieId })
  @Post('movie_id')
  async getByMovieId(@Body() movie_id: { movie: string }): Promise<Comment[]> {
    const comments = await this.commentService.getByMovieId(movie_id.movie);
    return comments;
  }
  @IsPublic()
  @ApiBody({ type: eComment })
  @Post('mail')
  async getByEmail(@Body() email: { mail: string }): Promise<Comment[]> {
    const comments = await this.commentService.getByEmail(email.mail);
    return comments;
  }

  //reply
  @Put('/reply/:id')
  async replyComment(@Param('id') id: string, @Body() comment: Comment) {
    return await this.commentService.updateReply(id, comment);
  }

  @Post()
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(RolesGuard)
  async create(@Body() comment: Comment): Promise<Comment> {
    return await this.commentService.create(comment);
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(RolesGuard)
  async update(
    @Param('id') id: string,
    @Body() comment: Comment
  ): Promise<Comment> {
    return this.commentService.update(id, comment);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(RolesGuard)
  async delete(@Param('id') id: string) {
    return await this.commentService.delete(id);
  }
}
