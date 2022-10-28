import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { SocketGateway } from '../../socket/socket.gateway';
import { Comment } from './comment';
import { CommentGetDto } from './PaginationParams';

@Injectable()
export class CommentService {
  @InjectModel('Comment') private readonly commentsModel: Model<Comment>;
  constructor(private readonly socket: SocketGateway) {}

  async getAll(pagination, comment: CommentGetDto) {
    const limit = pagination.limit || 10;
    const currentPage = pagination.page || 1;
    const skip = limit * (currentPage - 1);
    const total = await this.commentsModel.countDocuments(comment);
    const qtdPages = Math.floor(total / pagination.limit) + 1;

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

  // async getByMovieId(movie_id: string) {
  //   const movie = movie_id;
  //   return await this.commentsModel.findOne({ movie }).exec();
  // }

  async getByMovieId(pagination, movie_id: string) {
    const id = new ObjectId(movie_id);
    const limit = pagination.limit || 10;
    try {
      const commentsMovie = await this.commentsModel
        .find({ movie_id: id })
        .limit(limit);
      return commentsMovie;
    } catch {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  //criar paginação de comentarios do filme

  async getByEmail(mail: string) {
    try {
      const commentsMovie = await this.commentsModel
        .find({ email: mail })
        .limit(50);
      return commentsMovie;
    } catch {
      throw new HttpException('Check data -mail- ', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async create(comments: Comment): Promise<Comment> {
    try {
      const createdComment = new this.commentsModel(comments);
      this.socket.emitNewComment(createdComment);
      return await createdComment.save();
    } catch {
      throw new HttpException('Check all datas', HttpStatus.NOT_ACCEPTABLE);
    }
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
      return uppdate;
    } catch {
      throw new HttpException('Check all datas', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async delete(id: string) {
    try {
      return await this.commentsModel.findByIdAndDelete({ _id: id }).exec();
    } catch {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
