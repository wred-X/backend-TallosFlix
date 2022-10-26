import * as mongoose from 'mongoose';

export const likeSchema = new mongoose.Schema({
  commentId: mongoose.Types.ObjectId,
  userLike: {
    type: [Object],
    required: true,
  }

});
