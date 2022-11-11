import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class Comment {
  @ApiProperty({
    example: 'Wesley Romão',
    description: `O nome do user que comentou.`,
  })
  @IsNotEmpty({
    message: 'Nome Completo é obrigatório.',
  })
  name: string;

  @ApiProperty({
    example: 'email@email.com',
    description: `O e-mail é necessário para o login.`,
  })
  @IsEmail({ message: 'Email do usuario que comentou' })
  @IsNotEmpty({
    message: 'Email é obrigatório.',
  })
  email: string;

  @ApiProperty({
    example: 'a1234',
    description: `id que referencia o filme que recebeu o comentario`,
  })
  @IsNotEmpty({
    message: 'Tem que ser atribuido a um filme por id',
  })
  movie_id: string;

  @ApiProperty({
    example: 'Que filme bom!',
    description: `Comentario com a opinião do user sobre o filme`,
  })
  @IsNotEmpty({
    message: 'O comentario precisar ter algum texto.',
  })
  text: string;

  @ApiProperty({
    example: 'Is Reply: True. Is reply: false',
    description:
      ' Resposta de um comentário caso IsReply: True. Comentário principal caso IsReply: false',
  })
  @IsBoolean({
    message: 'Define se é resposta ou comentario principal',
  })
  isReply: Boolean;

  @ApiProperty({
    example: '123IDcomentarioRespondido123',
    description:
      'id a de reply existira somente se esse documento for uma resposta.',
  })
  @IsOptional()
  commentReply?: string;

  @ApiProperty({
    example: '1988-10-16T19:08:23.000Z',
    description: `Data em que o comentario foi realizado`,
  })
  @IsNotEmpty({
    message: 'A data precisa ser passada para armazenamento',
  })
  date: Date;

  @IsOptional()
  _id?: string;

  @ApiProperty({
    example: 100,
    description: 'número de likes',
  })
  @IsOptional()
  like?: number;

  @ApiProperty({
    example: 50,
    description: 'número de deslikes',
  })
  @IsOptional()
  deslike?: number;

  @ApiProperty({
    example: 'insira um link de imagem aqui',
    description: 'imagem de perfil do user',
  })
  @IsOptional()
  userAvatar?: string;

  constructor(comment?: Partial<Comment>) {
    // this._id = comment?._id;
    // this.name = comment?.name;
    // this.email = comment?.email;
    // this.movie_id = comment?.movie_id;
    // this.text = comment?.text;
    // this.date = comment?.date;
    // this.isReply = comment?.isReply;
    // this.commentReply = comment?.commentReply;
    // this.userAvatar = comment?.userAvatar;
    Object.assign(this, comment);
  }
}
