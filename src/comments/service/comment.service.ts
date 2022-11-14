import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { UserService } from '../../users/services/user.service';
import { SocketGateway } from '../../socket/socket.gateway';
import { Comment } from '../shared/comment';
import { CommentGetDto } from '../shared/PaginationParams';

@Injectable()
export class CommentService {
  @InjectModel('Comment') private readonly commentsModel: Model<Comment>;
  @Inject() private userService: UserService;
  constructor(private readonly socket: SocketGateway) {}

  async getAll(pagination, comment: CommentGetDto) {
    const limit = pagination.limit || 10;
    const currentPage = pagination.page || 1;
    const skip = limit * (currentPage - 1);
    const total = await this.commentsModel.countDocuments(comment);
    const qtdPages = Math.floor(total / pagination.limit) + 1;
    const totalResponse = await this.commentsModel.find(comment).count();
    try {
      const response = await this.commentsModel
        .find(comment)
        .limit(limit)
        .skip(skip);
      return {
        response,
        numberOfElements: total,
        pagesTotal: qtdPages,
        page: pagination.page || 1,
        totalResponse: totalResponse,
      };
    } catch {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async getById(id: string) {
    try {
      return await this.commentsModel.findById(id).exec();
    } catch {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async getByReply(pagination: any, id: string) {
    const replyId = new ObjectId(id);
    const limit = pagination.limit || 5;
    const currentPage = pagination.page || 1;
    const skip = limit * (currentPage - 1);
    const total = await this.commentsModel.countDocuments();
    const qtdPages = Math.floor(total / pagination.limit) + 1;
    const totalResponse = await this.commentsModel
      .find({ commentReply: id })
      .count();
    try {
      const response = await this.commentsModel
        .find({ commentReply: replyId })
        .limit(limit)
        .skip(skip);

      return {
        response,
        numberOfElements: total,
        pagesTotal: qtdPages,
        page: pagination.page || 1,
        totalReplys: totalResponse,
      };
    } catch {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  // async getByMovieId(movie_id: string) {
  //   const movie = movie_id;
  //   return await this.commentsModel.findOne({ movie }).exec();
  // }

  async getByMovieId(pagination, movie_id: string, comment: CommentGetDto) {
    const id = new ObjectId(movie_id);
    const limit = pagination.limit || 10;
    const currentPage = pagination.page || 1;
    const skip = limit * (currentPage - 1);
    const total = await this.commentsModel.countDocuments(comment);
    const qtdPages = Math.floor(total / pagination.limit) + 1;

    const countReplys = await this.commentsModel
      .find({ movie_id: id, isReply: true })
      .countDocuments();

    const myReplys = await this.commentsModel.find({
      movie_id: id,
      isReply: true,
    });

    try {
      const commentsMovie = await this.commentsModel
        .find({ movie_id: id, isReply: false })
        .limit(limit)
        .skip(skip);

      return {
        commentsMovie,
        numberOfElements: total,
        pagesTotal: qtdPages,
        page: pagination.page || 1,
        totalReplys: countReplys,
        replys: myReplys,
      };
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  //criar paginação de comentarios do filme

  async getByEmail(pagination, mail: string): Promise<Comment[]> {
    const limit = pagination.limit || 10;
    try {
      const commentsMovie = await this.commentsModel
        .find({ email: mail })
        .limit(limit);
      return commentsMovie;
    } catch {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async create(comments: Comment) {
    // try {
    const avatar = await this.userService.getPhoto(comments.email);
    comments.userAvatar = avatar;
    const createdComment = await this.commentsModel.create(comments);
    this.socket.emitNewComment(createdComment);
    return createdComment;
    // } catch {
    //   throw new HttpException('Check all datas', HttpStatus.NOT_ACCEPTABLE);
    // }
  }
  async updateReply(id: string, comment: Comment) {
    try {
      const createNewComment = this.create(comment);
      const replyComment = await this.commentsModel.findByIdAndUpdate(
        { _id: id },
        {
          $push: { comments: await createNewComment },
        },
        {
          new: true,
        }
      );
      this.socket.emitNewComment(comment);

      return replyComment;
    } catch {
      throw new HttpException('Check all datas', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async update(id: string, comments: Comment) {
    try {
      const uppdate = await this.commentsModel.findByIdAndUpdate(id, comments, {
        new: true,
      });
      this.socket.emitComentUpdated(comments);

      return uppdate;
    } catch {
      throw new HttpException('Check all datas', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async updateLike(id: string, likes: number, deslikes: number) {
    try {
      const update = await this.commentsModel.findByIdAndUpdate(
        id,
        { like: likes, deslike: deslikes },
        {
          new: true,
        }
      );
      this.socket.emitnewLike(update);

      return update;
    } catch {
      throw new HttpException('Check all datas', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async delete(id: string) {
    const deleteMore = new ObjectId(id);
    try {
      const deleted = await this.commentsModel.findByIdAndDelete({ _id: id });
      await this.commentsModel.deleteMany({ commentReply: deleteMore });
      this.socket.emitComentDeleted(id);
      return deleted;
    } catch {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
