import * as mongoose from 'mongoose';

export const FavoriteSchema = new mongoose.Schema({
  user_Id: String,
  movie_Id: {
    type: [String],
    required: true,
  },
});
