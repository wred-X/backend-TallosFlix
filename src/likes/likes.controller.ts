import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { IsPublic } from 'src/autentications/decorators/is-public-decorator';
import { Likes } from './model/likes';
import { LikesService } from './shared/likes.service';

@Controller('Likes')
export class LikesController {
  constructor(private likesService: LikesService) {}
  @IsPublic()
  @Get()
  async getLikes(){
    console.log('likes')
    const findLikes = await this.likesService.getAll()
    return findLikes;
  }

  @Post(':id')
  async likeComment(@Param('id') id: string, @Body() liked: Likes){
    const addLike = await this.likesService.likeComment(id, liked);
    return addLike;
  }

}
