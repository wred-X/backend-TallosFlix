import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Likes } from '../model/likes';
import { userLiked } from '../model/userLiked';

@Injectable()
export class LikesService {
  @InjectModel('Likes') private readonly likesModel: Model<Likes>;

  async getAll() {
    const result = await this.likesModel.find();
    console.log(result);
    return result;
  }

  async likeComment(id: string, liked: Likes) {
    const user = liked.userLike;
    const validateLiked = await this.likesModel.findOne({
      'userLike.userId': user.userId,
      commentId: id,
    });
    return validateLiked;
    //  (!validateLiked)
    //   return await this.likesModel.create(liked);

    //   return await this.likesModel.findOneAndUpdate(
    //     { commentId: id },
    //     { $push: { userLike: liked.userLike } },
    //     { new: true }
    //   )
    // console.log(validateLiked);
    // return validateLiked;
    // console.log(validateLiked)
    // console.log(liked.userLike);
  }
}
