//import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CommentGetDto {
  name: string;

  email: string;

  movie_id: string;

  text: string;

  date: Date;

  @IsOptional()
  _id: string;

  constructor(CommentGetDto?: Partial<CommentGetDto>) {
    this._id = CommentGetDto?._id;
    this.name = CommentGetDto?.name;
    this.email = CommentGetDto?.email;
    this.movie_id = CommentGetDto?.movie_id;
    this.text = CommentGetDto?.text;
    this.date = CommentGetDto?.date;
  }
}
