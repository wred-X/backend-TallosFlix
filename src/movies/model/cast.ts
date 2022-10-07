import { ApiProperty } from '@nestjs/swagger';

export class Cast {
  @ApiProperty({
    example: 'Leonardo DiCaprio',
    description: `Categoria para busca de Atores.`,
  })
  actor: string;
}
