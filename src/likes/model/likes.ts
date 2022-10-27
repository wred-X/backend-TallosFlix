import { ObjectId } from 'mongoose';
import { userLiked } from './userLiked';

export class Likes {
  commentId: string;
  userLike: userLiked[];
}
