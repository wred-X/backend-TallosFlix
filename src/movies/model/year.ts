import { ApiProperty } from '@nestjs/swagger';

export class Year {
  @ApiProperty({
    example: 'A-Z',
    description: `Busca por Primeira letra de filme.`,
  })
  year: number;
}
