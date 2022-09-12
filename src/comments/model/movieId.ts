import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export class MovieId {
  @ApiProperty({
    example: '573a1390f29313caabcd41b1',
    description: `id de busca comentarios de um filme especifico`,
  })
  movie: string;
}
