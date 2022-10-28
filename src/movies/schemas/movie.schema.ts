import * as mongoose from 'mongoose';

export const MovieSchema = new mongoose.Schema({
  plot: String,
  genres: {
    type: [String],
    required: true,
  },
  runtime: Number,
  cast: {
    type: [String],
    required: true,
  },
  num_mflix_comments: Number,
  poster: String,
  title: String,
  fullplot: String,
  metacritic: Number,
  languages: {
    type: [String],
    required: true,
  },
  countries: {
    type: [String],
    required: true,
  },
  realeased: Date,
  directors: {
    type: [String],
    required: true,
  },
  rated: String,
  awards: {
    wins: Number,
    nominations: Number,
    text: String,
  },
  lastupdadted: String,
  year: Number,
  imdb: {
    rating: Number,
    votes: Number,
    id: Number,
  },
  type: String,
  tomatoes: {
    viewer: {
      rating: Number,
      numReviews: Number,
      meter: Number,
    },
    critic: {
      rating: Number,
      numReviews: Number,
      meter: Number,
    },
    dvd: Date,
    lastUpdated: Date,
    rotten: Number,
    fresh: Number,
  },
  dvd: Date,
  fresh: Number,
  production: String,
  rotten: Number,
  lastUpdated: Date,
  website: String,
  writers: [String],
  trailer: String,
});
