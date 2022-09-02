import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';

export class Theater extends Document {
  @ApiProperty({
    example: 20000,
    description: `ID do teatro`,
  })
  @IsNotEmpty({
    message: 'ID do teatro é obrigatorio',
  })
  theaterId: number;

  @ApiProperty({
    example:
      'address: {street1: 1431 Coral Ridge Avenue, city: Coralville, state: IA, zipcode: 52241,}  geo: {type: Point, coordinates: [-91.602524,41.692726]}',
    description: `Endereço completo para localização do teatro`,
  })
  @IsNotEmpty({
    message: 'Endereço completo para localização do teatro é obrigatorio',
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

// export interface Coordinates extends Document {
//   geo: number;
// }
