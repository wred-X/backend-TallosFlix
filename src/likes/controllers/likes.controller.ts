import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommentService } from '../../comments/service/comment.service';
import { IsPublic } from '../../autentications/decorators/is-public-decorator';
import { Roles } from '../../autentications/decorators/role-decorator';
import { RolesGuard } from '../../autentications/guards/role.guard';
import { Role } from '../../autentications/models/role.enum';
import { Likes } from '../model/likes';
import { userLiked } from '../model/userLiked';
import { LikesService } from '../services/likes.service';

@ApiTags('likes')
@ApiBearerAuth('JWT-auth')
@Controller('Likes')
export class LikesController {
  constructor(
    private likesService: LikesService,
    private commentService: CommentService
  ) {}
  @IsPublic()
  @Get()
  async getLikes() {
    const findLikes = await this.likesService.getAll();
    return findLikes;
  }

  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(RolesGuard)
  @Get('validate')
  async getCommentId(@Query() query: Likes) {
    return await this.likesService.byId(query);
  }

  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(RolesGuard)
  @Post(':id')
  async likeComment(@Param('id') id: string, @Body() liked: userLiked) {
    const countLikes = await this.likesService.likeComment(id, liked);
    //this.likesService.allLikes(id, find.userId);
    const upLikes = await this.likesService.allLikes(id, liked.userId);

    const upComment = await this.commentService.updateLike(
      upLikes.id,
      upLikes.likes,
      upLikes.deslikes
    );

    return upComment;
  }

  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() liked: Likes) {
    const countLikes = await this.likesService.create(liked);

    if (countLikes.userLike[0] === liked.userLike[0]) {
      const upLikes = await this.likesService.allLikes(
        countLikes.commentId,
        countLikes.userLike[0].userId
      );

      const upComment = await this.commentService.updateLike(
        upLikes.id,
        upLikes.likes,
        upLikes.deslikes
      );

      return upComment;
    } else {
      return this.likeComment(countLikes.commentId, liked.userLike[0]);
    }
  }

  @Roles(Role.ADMIN, Role.USER)
  @IsPublic()
  @Post('list/:id')
  async allLikes(
    @Param('id') id: string,
    @Body() find: { userId: string }
  ): Promise<object> {
    const response = await this.likesService.allLikes(id, find.userId);
    console.log(response);
    const myLike = {
      resLike: response.myLike,
      resComment: response.id,
      resUserId: response.userId,
    };
    return myLike;
  }
}
