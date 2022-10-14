import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Document } from 'mongoose';

export class updateTheater {
  @ApiProperty({
    example: 20000,
    description: `ID do teatro`,
  })
  @IsOptional()
  theaterId: number;

  @ApiProperty({
    example:
      'location: {address: { street1: 1400 Coral Ridge Avenue, city: Coralville, state: IA, zipcode: 52241 }, geo: { type: Point, coordinates: [ -91.602524, 41.692726 ]}}',
    description: `Endereço completo para localização do teatro`,
  })
  @IsOptional()
  location: {
    address: {
      street1: string;
      city: string;
      state: string;
      zipcode: string;
    };
    geo: {
      type: string;
      coordinates: number[];
    };
  };
}
