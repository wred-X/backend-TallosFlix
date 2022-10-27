import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Likes } from '../model/likes';
import { ObjectId } from 'mongodb';
import { userLiked } from '../model/userLiked';

@Injectable()
export class LikesService {
  @InjectModel('Likes') private readonly likesModel: Model<Likes>;

  async getAll() {
    const result = await this.likesModel.find();
    return result;
  }

  async allLikes(id: string) {
    const result = await this.likesModel.find({
      commentId: id,
    });
    let valueLikes = 0;
    let valueDeslikes = 0;
    for (let i = 0; i < result[0].userLike.length; i++) {
      if (result[0].userLike[i].like === true) valueLikes++;
      if (result[0].userLike[i].unlike === true) valueDeslikes++;
    }
    const likeNumbers = { likes: valueLikes, deslikes: valueDeslikes };
    return likeNumbers;
  }

  async create(newLike: Likes) {
    // try {
    const createdTheater = this.likesModel.create(newLike);
    return await createdTheater;
    // } catch (error) {
    //   throw new HttpException('Check all datas', HttpStatus.NOT_ACCEPTABLE);
    // }
  }

  async likeComment(id: string, array: userLiked) {
    const userLike = array;

    //verifica se o userId ja deu like ou deslike nesse comentario especifico
    const validateLiked = await this.likesModel.findOne({
      commentId: id,
      userLike: { $elemMatch: { userId: userLike.userId } },
    });
    //caso tenha dado like ou unlike, ele fara o update do novo like ou unlike

    if (validateLiked) {
      await this.likesModel.findOneAndUpdate(
        {
          commentId: id,
          userLike: { $elemMatch: { userId: userLike.userId } },
        },
        {
          $pull: {
            userLike: { userId: userLike.userId },
          },
        },
        { new: true }
      );
      if (userLike.like === true || userLike.unlike === true) {
        const newLike = this.pushFuction(id, userLike);
        return newLike;
      }
    } else {
      //caso n tenha dado like e nem unlike, n existe o objeto dentro do array de userLikes, então ele deve criar um novo objeto dentro do array do commentId
      const newLike = this.pushFuction(id, userLike);
      return newLike;
    }
  }

  async pushFuction(id: string, liked: userLiked) {
    //verifica se o userId ja deu like ou deslike nesse comentario especifico
    const pushLike = await this.likesModel.findOneAndUpdate(
      { commentId: id },
      { $push: { userLike: liked } },
      { new: true }
    );

    return pushLike;
  }
}
