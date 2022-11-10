import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class userLiked {
  @ApiProperty({
    example: '59b99db4cfa9a34dcd7885b6',
    description: 'id do usuario',
  })
  userId: string;

  @ApiProperty({ example: 'true ou false' })
  like: boolean;
  @ApiProperty({ example: 'true ou false' })
  unlike: boolean;
}
