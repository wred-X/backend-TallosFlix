import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './comment';

@Injectable()
export class CommentService {
  @InjectModel('Comment') private readonly commentsModel: Model<Comment>;

  async getAll() {
    return await this.commentsModel.find().exec();
  }

  async getById(id: string) {
    return await this.commentsModel.findById(id).exec();
  }

  async getByMovieId(movie_id: string) {
    return await this.commentsModel.find({ comments: movie_id });
  }

  async create(comments: Comment) {
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
