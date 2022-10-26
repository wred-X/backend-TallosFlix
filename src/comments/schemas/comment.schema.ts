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
    isReply: Boolean,
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      required: false,
    },
    // likes: [mongoose.Schema.Types.ObjectId],
    // unlikes:[mongoose.Schema.Types.ObjectId],
  },

  { typeKey: '$type' }
);
