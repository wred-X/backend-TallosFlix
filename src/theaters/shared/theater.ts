export class Theater {
  theaterId: number;
  location: {
    adress: {
      street1: string;
      city: string;
      state: string;
    };
    geo: {
      type: string;
      coordinates: {
        0: number;
        1: number;
      };
    };
  };
}
