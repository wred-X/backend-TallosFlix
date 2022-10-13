import { ApiProperty } from '@nestjs/swagger';

export class Letter {
  @ApiProperty({
    example: 'A-Z',
    description: `Busca por Primeira letra de filme.`,
  })
  letter: string;
}
