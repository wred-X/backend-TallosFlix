import { ApiProperty } from '@nestjs/swagger';

export class Directors {
  @ApiProperty({
    example: 'Quentin Tarantino',
    description: `Categoria para busca de Atores.`,
  })
  director: string;
}
