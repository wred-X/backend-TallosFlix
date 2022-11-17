import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SocketGateway } from '../../socket/socket.gateway';
import { Likes } from '../model/likes';
import { userLiked } from '../model/userLiked';

@Injectable()
export class LikesService {
  @InjectModel('Likes') private readonly likesModel: Model<Likes>;
  constructor(private readonly socket: SocketGateway) {}

  async getAll() {
    try {
      const result = await this.likesModel.find();
      return result;
    } catch (error) {
      throw new HttpException(
        `Não encontramos, ${error}`,
        HttpStatus.NOT_FOUND
      );
    }
  }
  async byId(query: Likes) {
    try {
      const result: Likes = await this.likesModel.findOne({
        commentId: query.commentId,
      });
      !result;
      await this.create(query);

      return result;
    } catch (error) {
      throw new HttpException(
        `Não encontramos, ${error}`,
        HttpStatus.NOT_FOUND
      );
    }
  }
  async allLikes(id: string, userId: string) {
    let valueLikes = 0;
    let valueDeslikes = 0;
    let myLike: string = 'NOT';

    try {
      const result = await this.likesModel.find({
        commentId: id,
      });
      for (let i = 0; i < result[0].userLike.length; i++) {
        console.log(result[0].userLike[i].userId);
        console.log(userId);
        if (result[0].userLike[i].like === true) valueLikes++;
        if (result[0].userLike[i].unlike === true) valueDeslikes++;
        if (
          result[0].userLike[i].userId == userId &&
          result[0].userLike[i].like === true
        )
          myLike = 'LIKE';
        if (
          result[0].userLike[i].userId == userId &&
          result[0].userLike[i].unlike === true
        )
          myLike = 'UNLIKE';
      }
      const likeNumbers = {
        likes: valueLikes,
        deslikes: valueDeslikes,
        myLike,
        id,
        userId,
      };
      console.log(likeNumbers);
      this.socket.emitnewLike(likeNumbers);

      return likeNumbers;
    } catch (error) {
      console.error(
        `Opa, esse comentario nunca foi avaliado. Crie sua primeira avaliação${error}`
      );
      return { likes: 0, deslikes: 0, myLike: 'NOT', id: id, userId: userId };
    }
  }

  async create(docLike: Likes) {
    try {
      const result: Likes = await this.likesModel.findOne({
        commentId: docLike.commentId,
      });
      if (!result) {
        const createdLikeDoc = this.likesModel.create(docLike);
        return await createdLikeDoc;
      } else {
        return result;
      }
    } catch {
      throw new HttpException('Check all datas', HttpStatus.LENGTH_REQUIRED);
    }
  }

  async likeComment(id: string, array: userLiked) {
    const userLike = array;
    //verifica se o userId ja deu like ou deslike nesse comentario especifico
    const validateLiked = await this.likesModel.findOne({
      commentId: id,
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
      this.socket.emitnewLike(validateLiked);
      console.log(userLike.like, userLike.unlike);

      if (userLike.like === true || userLike.unlike === true) {
        console.log('entrei');
        const newLike = await this.pushFuction(id, userLike);
        return newLike;
      }
    } else {
      //caso n tenha dado like e nem unlike, n existe o objeto dentro do array de userLikes, então ele deve criar um novo objeto dentro do array do commentId
      const newLike = await this.pushFuction(id, userLike);
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
    this.socket.emitnewLike(pushLike);

    return pushLike;
  }
}
