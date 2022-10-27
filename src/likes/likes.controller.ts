import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../autentications/decorators/role-decorator';
import { RolesGuard } from '../autentications/guards/role.guard';
import { Role } from '../autentications/models/role.enum';
import { IsPublic } from '../autentications/decorators/is-public-decorator';
import { Likes } from './model/likes';
import { userLiked } from './model/userLiked';
import { LikesService } from './shared/likes.service';

@Controller('Likes')
export class LikesController {
  constructor(private likesService: LikesService) {}
  @IsPublic()
  @Get()
  async getLikes() {
    console.log('likes');
    const findLikes = await this.likesService.getAll();
    return findLikes;
  }

  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(RolesGuard)
  @Get('validate')
  async getCommentId(@Query() query: any) {
    console.log('control', query);
    return await this.likesService.byId(query);
  }

  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(RolesGuard)
  @Post(':id')
  async likeComment(
    @Param('id') id: string,
    @Body() liked: userLiked
  ): Promise<Likes> {
    const addLike = await this.likesService.likeComment(id, liked);
    return addLike;
  }

  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() liked: Likes): Promise<Likes> {
    return await this.likesService.create(liked);
  }

  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(RolesGuard)
  @Get(':id')
  async allLikes(@Param('id') id: string): Promise<object> {
    const addLike = await this.likesService.allLikes(id);
    return addLike;
  }
}
