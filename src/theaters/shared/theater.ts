import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';

export class Theater {
  @ApiProperty({
    example: 20000,
    description: `ID do teatro`,
  })
  theaterId: number;

  @ApiProperty({
    example:
      'location: {address: { street1: 1400 Coral Ridge Avenue, city: Coralville, state: IA, zipcode: 52241 }, geo: { type: Point, coordinates: [ -91.602524, 41.692726 ]}}',
    description: `Endereço completo para localização do teatro`,
  })
  location: {
    address: {
      street1: string;
      city: string;
      state: string;
      zipcode: string;
    };
    geo: {
      type: string;
      coordinates: [number];
    };
  };
}

// export interface Coordinates  {
//   geo: number;
// }
