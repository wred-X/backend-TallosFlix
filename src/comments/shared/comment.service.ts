import { Comment } from 'src/comments/shared/comment';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { CommentGetDto } from './PaginationParams';

@Injectable()
export class CommentService {
  @InjectModel('Comment') private readonly commentsModel: Model<Comment>;

  async getAll(pagination, comment:CommentGetDto) {
    const limit = pagination.limit || 10;
    const currentPage = pagination.page || 1;
    const skip = limit * (currentPage - 1);
    const total = await this.commentsModel.countDocuments(comment);
    const qtdPages = Math.floor(total / pagination.limit) + 1;

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
  }

  async getById(id: string) {
    return await this.commentsModel.findById(id).exec();
  }

  // async getByMovieId(movie_id: string) {
  //   const movie = movie_id;
  //   return await this.commentsModel.findOne({ movie }).exec();
  // }

  async getByMovieId(movie_id: string) {
    const id = new ObjectId(movie_id);
    const commentsMovie = await this.commentsModel
      .find({ movie_id: id })
      .limit(50);
    return commentsMovie;
  }

  //criar paginação de comentarios do filme

  async getByEmail(mail: string) {
    const commentsMovie = await this.commentsModel
      .find({ email: mail })
      .limit(50);
    return commentsMovie;
  }

  async create(comments: Comment): Promise<Comment> {
    const createdComment = new this.commentsModel(comments);
    return await createdComment.save();
  }

  async update(id: string, comments: Comment) {
    return await this.commentsModel.findByIdAndUpdate(id, comments, {
      new: true,
    });
  }

  async delete(id: string) {
    return await this.commentsModel.findByIdAndDelete({ _id: id }).exec();
  }
}
