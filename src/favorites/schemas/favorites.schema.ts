import * as mongoose from 'mongoose';

export const FavoriteSchema = new mongoose.Schema({
  user_Id: mongoose.Schema.Types.ObjectId,
  movie_Id: {
    type: [String],
    required: true,
  },
});
