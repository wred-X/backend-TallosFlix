import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmpty,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class updateTheater {
  @ApiProperty({
    example: '1d2sds2d1s5',
    description: `id unico do teatro`,
  })
  _id?: string;
  @ApiProperty({
    example: 20000,
    description: `ID do teatro`,
  })
  @IsOptional()
  theaterId: number;

  @ApiProperty({
    example: {
      address: {
        street1: '1400 Coral Ridge Avenue',
        city: 'Coralville',
        state: 'IA',
        zipcode: '52241',
      },
      geo: { type: 'Point', coordinates: [-91.602524, 41.692726] },
    },
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
      coordinates: number[];
    };
  };
}
