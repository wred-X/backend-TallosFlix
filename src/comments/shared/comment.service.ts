import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './comment';
import { ObjectId } from 'mongodb';

@Injectable()
export class CommentService {
  @InjectModel('Comment') private readonly commentsModel: Model<Comment>;

  async getAll() {
    return await this.commentsModel.find().exec();
  }

  async getById(id: string) {
    return await this.commentsModel.findById(id).exec();
  }

  // async getByMovieId(movie_id: string) {
  //   const movie = movie_id;
  //   return await this.commentsModel.findOne({ movie }).exec();
  // }

  async getByMovieId(movie_id: string): Promise<Comment[]> {
    //const id = `ObjectId('${movie_id}')`;
    const id = new ObjectId(movie_id);
    const commentsMovie = this.commentsModel.find(id);
    console.log(commentsMovie, 'serviceeeeeee');
    return commentsMovie;
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
