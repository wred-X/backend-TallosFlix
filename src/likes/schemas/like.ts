import * as mongoose from 'mongoose';

export const likeSchema = new mongoose.Schema({
  commentId: mongoose.Types.ObjectId,
  userLike: {
    userId: mongoose.Types.ObjectId,
    required: true,
    type: [Object],
  }

});
