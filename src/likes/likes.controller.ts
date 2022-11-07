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
import { IsPublic } from '../autentications/decorators/is-public-decorator';
import { Roles } from '../autentications/decorators/role-decorator';
import { RolesGuard } from '../autentications/guards/role.guard';
import { Role } from '../autentications/models/role.enum';
import { Likes } from './model/likes';
import { userLiked } from './model/userLiked';
import { LikesService } from './shared/likes.service';

@ApiTags('likes')
@ApiBearerAuth('JWT-auth')
@Controller('Likes')
export class LikesController {
  constructor(private likesService: LikesService) {}
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
  async allLikes(
    @Param('id') id: string,
    @Body() find: { userId: string }
  ): Promise<object> {
    // /likes/:COMENTARIOID/({
    //   USERID=STATEID
    // })
    // RESPONSE = {50, 10, 'LIKE'}
    console.log(find.userId, 'controllerrrrrrrr');
    const addLike = await this.likesService.allLikes(id, find.userId);
    return addLike;
  }
}
