import * as mongoose from 'mongoose';

export const likeSchema = new mongoose.Schema({
  commentId: mongoose.Types.ObjectId,
  userLike: {
    type: [Object],
    userId: {
      type: mongoose.Types.ObjectId,
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
