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
import { IsPublic } from '../../autentications/decorators/is-public-decorator';
import { Roles } from '../../autentications/decorators/role-decorator';
import { RolesGuard } from '../../autentications/guards/role.guard';
import { Role } from '../../autentications/models/role.enum';
import { eComment } from '../model/emailComment';
import { MovieId } from '../model/movieId';
import { Comment } from '../shared/comment';
import { CommentService } from '../service/comment.service';
import { CommentGetDto } from '../shared/PaginationParams';
import { Reply } from '../shared/reply';

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
  @Roles(Role.ADMIN, Role.USER)
  @Get('/response/:id')
  async getByReply(@Query() pagination: any, @Param('id') id: string) {
    return await this.commentService.getByReply(pagination, id);
  }

  @IsPublic()
  @ApiBody({ type: MovieId })
  @Post('movie_id')
  async getByMovieId(
    @Query() pagination,
    comment: CommentGetDto,
    @Body() movie_id: { movie: string }
  ) {
    const comments = await this.commentService.getByMovieId(
      pagination,
      movie_id.movie,
      comment
    );
    return comments;
  }

  @IsPublic()
  @ApiBody({ type: eComment })
  @Post('email')
  async getByEmail(
    @Query() pagination,
    @Body() email: { mail: string }
  ): Promise<Comment[]> {
    const comments = await this.commentService.getByEmail(
      pagination,
      email.mail
    );
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
  async create(@Body() comment: Comment) {
    const createRetorno = await this.commentService.create(comment);
    return createRetorno;
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
