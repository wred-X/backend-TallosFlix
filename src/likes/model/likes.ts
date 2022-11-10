import { ApiProperty } from '@nestjs/swagger';
import { userLiked } from './userLiked';

export class Likes {
  @ApiProperty({
    example: '5a9427648b0beebeb69579d5',
    description: `id do comentario`,
  })
  commentId: string;
  @ApiProperty({
    example: { userId: '59b99db4cfa9a34dcd7885b6', like: true, unlike: false },
    description: `id do comentario`,
  })
  userLike: userLiked[];
}
