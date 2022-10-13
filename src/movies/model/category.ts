import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export class Category {
  @ApiProperty({
    example: 'Short',
    description: `Busca filmes por categoria.`,
  })
  category: string;
}
