import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export class Category {
  @ApiProperty({
    example: 'Short',
    description: `Categoria para busca de filmes.`,
  })
  category: string;
}
