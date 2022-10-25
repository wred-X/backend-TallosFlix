import * as mongoose from 'mongoose';

export const RatingSchema = new mongoose.Schema({
  movie_id: String,
  allRate: {
    type: [Object],
    required: true,
  },
});
