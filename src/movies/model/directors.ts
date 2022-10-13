import { ApiProperty } from '@nestjs/swagger';

export class Directors {
  @ApiProperty({
    example: 'Quentin Tarantino',
    description: `Busca por Diretores.`,
  })
  director: string;
}
