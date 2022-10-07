import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export class eComment {
  @ApiProperty({
    example: 'julian_glover@gameofthron.es',
    description: `id de busca comentarios pelo email de um user especifico`,
  })
  mail: string;
}
