export class Movie {
  plot: string;
  genres: [];
  runtime: number;
  cast: [];
  num_mflix_comments: number;
  title: string;
  fullplot: string;
  countries: [];
  realeased: Date;
  directors: [];
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
    lastUpdated: Date;
  };
}
