import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { userLiked } from './userLiked';

export class Likes {
  @ApiProperty({
    example: '5a9427648b0beebeb69579d5',
    description: `id do comentario`,
  })
  commentId: string;
  userLike: userLiked[];
}
