import { ApiProperty } from '@nestjs/swagger';

export class Directors {
  @ApiProperty({
    example: 'Quentin Tarantino',
    description: `Busca por filmes do Diretor.`,
  })
  director: string;
}
