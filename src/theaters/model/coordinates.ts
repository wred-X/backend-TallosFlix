import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export class Coordinates extends Document {
  @ApiProperty({
    example: -91.602524,
    description: `Latitude para de busca coordenadas`,
  })
  lat: number;

  @ApiProperty({
    example: 41.692726,
    description: `Longitude para de busca coordenadas`,
  })
  long: number;
}
