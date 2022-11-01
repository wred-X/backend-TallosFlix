import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export class Pages {
  @ApiProperty({
    example: 15,
    description: `15 filmes`,
  })
  limit: number;

  @ApiProperty({
    example: 1,
    description: `1 pagina`,
  })
  skip: number;
  
  @ApiProperty({
    example: 1,
    description: `1 - pagina atual` 
  })
  page?: number;
}
