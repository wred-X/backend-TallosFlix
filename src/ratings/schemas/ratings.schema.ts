import * as mongoose from 'mongoose';

export const RatingSchema = new mongoose.Schema({
  movie_id: mongoose.Schema.Types.ObjectId,
  allRate: {
    type: [Object],
    required: true,
  },
});
