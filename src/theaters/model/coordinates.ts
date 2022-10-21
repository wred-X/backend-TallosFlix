import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';

export class Coordinates {
  @ApiProperty({
    example: -91.602524,
    description: `Latitude para de busca coordenadas`,
  })
  @IsNotEmpty()
  lat: number;

  @ApiProperty({
    example: 41.692726,
    description: `Longitude para de busca coordenadas`,
  })
  @IsNotEmpty()
  long: number;
}
