import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsNumberString,
} from 'class-validator';

export class Theater {
  constructor(Theater?: Partial<Theater>) {
    // (this.theaterId = Theater?.theaterId),
    //   (this.location = Theater?.location),
    //   // (this.location.address = Theater?.location.address),
    //   // (this.location.address.street1 = Theater?.location.address.street1),
    //   // (this.location.address.city = Theater?.location.address.city),
    //   // (this.location.address.state = Theater?.location.address.state),
    //   // (this.location.address.zipcode = Theater?.location.address.zipcode),
    //   // (this.location.geo.type = Theater?.location.geo.type),
    //   // (this.location.geo.coordinates = Theater?.location.geo.coordinates),
    //   (this._id = Theater?._id);
    Object.assign(this, Theater)

  }

  @ApiProperty({
    example: '1232fkk5',
    description: `_id do teatro`,
  })
  @IsOptional()
  @IsString()
  _id?: string;
  @ApiProperty({
    example: 20000,
    description: `ID do teatro`,
  })
  @IsNotEmpty()
  @IsNumber()
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
  @IsNotEmpty()
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

// export interface Coordinates  {
//   geo: number;
// }
