import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './comment';
import { ObjectId } from 'mongodb';
import { SocketGateway } from 'src/socket/socket.gateway';

@Injectable()
export class CommentService {
  @InjectModel('Comment') private readonly commentsModel: Model<Comment> ;
  constructor(
    private readonly socket: SocketGateway,

  ) {}

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
    this.socket.emitNewComment(createdComment)
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
