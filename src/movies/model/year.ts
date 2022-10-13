import { ApiProperty } from '@nestjs/swagger';

export class Year {
  @ApiProperty({
    example: 2000,
    description: `Busca por ano de lançamento do filme.`,
  })
  year: number;
}
