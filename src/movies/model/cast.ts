import { ApiProperty } from '@nestjs/swagger';

export class Cast {
  @ApiProperty({
    example: 'Leonardo DiCaprio',
    description: `Busca por filmes do Ator.`,
  })
  actor: string;
}
