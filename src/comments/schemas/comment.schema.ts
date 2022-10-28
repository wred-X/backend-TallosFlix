import * as mongoose from 'mongoose';
export const CommentSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    movie_id: mongoose.Schema.Types.ObjectId,
    text: String,
    date: Date,
    isReply: Boolean,
    comments: Array,
  },
  // comments:  [mongoose.Schema.Types.ObjectId],
  { typeKey: '$type' }
);
