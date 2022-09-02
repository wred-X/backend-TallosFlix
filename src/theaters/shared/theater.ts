import { Document } from 'mongoose';

export class Theater extends Document {
  theaterId: number;
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
