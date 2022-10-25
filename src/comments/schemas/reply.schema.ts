import * as mongoose from 'mongoose';
export const replySchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    movie_id: {
      type: String,
    },
    text: String,
    date: Date,
    likes: {
      like: Number,
      unlike:Number,
    },
    isReply: Boolean,
    comments: [String],
  },
  

  { typeKey: '$type' }
);
