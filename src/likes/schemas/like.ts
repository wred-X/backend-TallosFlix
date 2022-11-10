import * as mongoose from 'mongoose';

export const likeSchema = new mongoose.Schema({
  commentId: mongoose.Schema.Types.ObjectId,
  userLike: {
    type: [Object],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    like: {
      type: Boolean,
    },
    unlike: {
      type: Boolean,
    },
  },
});
