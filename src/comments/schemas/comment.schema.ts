import * as mongoose from 'mongoose';
export const CommentSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    movie_id: {
      type: String,
    },
    text: String,
    date: Date,
  },
  { typeKey: '$type' }
);
