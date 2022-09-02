export class Movie {
  plot: string;
  genres: [string];
  runtime: number;
  cast: [string];
  num_mflix_comments: number;
  poster: string;
  title: string;
  fullplot: string;
  languages: [string];
  countries: [string];
  realeased: Date;
  directors: [string];
  rated: string;
  awards: {
    wins: number;
    nominations: number;
    text: string;
  };
  lastupdadted: string;
  year: number;
  imdb: {
    rating: number;
    votes: number;
    id: number;
  };
  type: string;
  tomatoes: {
    viewer: {
      rating: number;
      numReviews: number;
      meter: number;
    };
    dvd: Date;
    lastUpdated: Date;
  };
}
