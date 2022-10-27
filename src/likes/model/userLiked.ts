import { ObjectId } from 'mongoose';

export class userLiked {
  userId: ObjectId | String;
  like: boolean;
  unlike: boolean;
}
