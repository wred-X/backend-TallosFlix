import { ObjectId } from 'mongoose';

export class userLiked {
  userId: ObjectId;
  like: boolean;
  unlike: boolean;
}
