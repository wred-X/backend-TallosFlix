import { IsOptional } from 'class-validator';
import { Document } from 'mongoose';
export class Movie extends Document {
  @IsOptional()
  plot: string;

  genres: [string];

  @IsOptional()
  runtime: number;

  cast: [string];

  @IsOptional()
  num_mflix_comments: number;

  @IsOptional()
  poster: string;
  title: string;

  @IsOptional()
  fullplot: string;

  @IsOptional()
  metacritic: number;

  languages: [string];
  countries: [string];

  @IsOptional()
  realeased: Date;

  directors: [string];

  @IsOptional()
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

  @IsOptional()
  tomatoes: {
    viewer: {
      rating: number;
      numReviews: number;
      meter: number;
    };
    dvd: Date;
    lastUpdated: Date;
  };
  dvd: Date;
  fresh: number;
  production: string;
  rotten: number;
  lastUpdated: Date;
  website: string;

  @IsOptional()
  writers: [string];
}
