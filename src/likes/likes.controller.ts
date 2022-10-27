import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { IsPublic } from 'src/autentications/decorators/is-public-decorator';
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

  @Post(':id')
  async likeComment(
    @Param('id') id: string,
    @Body() liked: userLiked
  ): Promise<Likes> {
    const addLike = await this.likesService.likeComment(id, liked);
    return addLike;
  }

  @Post()
  async create(@Body() liked: Likes): Promise<Likes> {
    return await this.likesService.create(liked);
  }

  @Get(':id')
  async allLikes(@Param('id') id: string): Promise<object> {
    const addLike = await this.likesService.allLikes(id);
    return addLike;
  }
}
