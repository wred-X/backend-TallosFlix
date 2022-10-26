import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Likes } from '../model/likes';
import { ObjectId } from 'mongodb';

@Injectable()
export class LikesService {
  @InjectModel('Likes') private readonly likesModel: Model<Likes>;

  async getAll() {
    const result = await this.likesModel.find();
    console.log(result);
    return result;
  }

  async likeComment(id: string, liked: Likes) {
    const userLike = liked.userLike;
    console.log(userLike);

    //verifica se o userId ja deu like ou deslike nesse comentario especifico
    const validateLiked = await this.likesModel.findOne({
      commentId: id,
      'userLike.userId': userLike.userId,
    });

    //caso tenha dado like ou unlike, ele fara o update do novo like ou unlike
    if (validateLiked) {
      console.log('sim');
      await this.likesModel.findOneAndUpdate(
        { commentId: id, 'userlike.userId': userLike.userId },
        {
          $pull: {
            userLike: liked.userLike,
          },
          $push: { userLike: liked.userLike },
        },
        { new: true }
      );
    } else {
      //caso n tenha dado like e nem unlike, n existe o objeto dentro do array de userLikes, então ele deve criar um novo objeto dentro do array do commentId
      console.log('nao');
      await this.likesModel.findOneAndUpdate(
        { commentId: id },
        { $push: { userLike: liked.userLike } },
        { new: true }
      );
      //  await this.likesModel.create(liked);
    }
    return validateLiked;
    // const finded =

    // return finded;

    //   : await this.likesModel.findOneAndUpdate(
    //       { commentId: id },
    //       { $push: { userLike: liked.userLike } },
    //       { new: true }
    //     );
    // return validateLiked;

    // console.log(validateLiked);
    // console.log(validateLiked)
    // console.log(liked.userLike);
  }
}
