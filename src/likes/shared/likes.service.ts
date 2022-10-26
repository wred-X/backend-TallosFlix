import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { count } from 'console';
import { Model } from 'mongoose';
import { Likes } from '../model/likes';
import  ObjectId, {Types} from 'mongoose';
@Injectable()
export class LikesService {
  @InjectModel('Likes') private readonly likesModel: Model<Likes>;

  async getAll() {
    const result = await this.likesModel.find();
    return result;
  }

  async likeComment(id: string, liked: Likes) {
    const userLike = liked.userLike;

    //verifica se o userId ja deu like ou deslike nesse comentario especifico
    const validateLiked = await this.likesModel.findOne({
      commentId: id,
      'userLike.userId': userLike.userId,
    });
    //caso tenha dado like ou unlike, ele fara o update do novo like ou unlike


    if (validateLiked) {
      console.log('sim')
      await this.likesModel.findOneAndUpdate(
        { commentId: id, 'userlike.userId': userLike.userId },
        {
          $pull: {
            userLike: { userId: liked.userLike.userId },
          },
        },
        { new: true }
      );
      this.pushLiked(id, liked);
    } else {
      //caso n tenha dado like e nem unlike, n existe o objeto dentro do array de userLikes, então ele deve criar um novo objeto dentro do array do commentId

      this.pushLiked(id, liked);
      //await this.likesModel.create(liked);
    }
    return validateLiked;
  }

  
  async pushLiked(id: string, liked: Likes) {
    console.log('deu bom')
    const pushLike = await this.likesModel.findOneAndUpdate(
      { commentId: id },
      { $push: { userLike: liked.userLike } },
      { new: true }
    );
    return pushLike;
  }
}
