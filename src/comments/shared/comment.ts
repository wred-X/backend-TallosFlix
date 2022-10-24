import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsObject, IsOptional } from 'class-validator';

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
    example: '20 likes, 2 unlikes',
    description:
      'Numeros de Likes e Unlikes que um comentário ou resposta terá',
  })

 @IsOptional({
  message: 'Likes e unlikes de uma resposta ou comentario',
})
  likes: {
    like: Number;
    unlike: Number;
  };

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
    example: 'Eu não concordei com seu comentário',
    description: 'Array de resposta aos comentários',
  })
  @IsArray({
    message: 'Array de respostas'
  })
  comments: String[];

  @ApiProperty({
    example: '1988-10-16T19:08:23.000Z',
    description: `Data em que o comentario foi realizado`,
  })

  @IsNotEmpty({
    message: 'A data precisa ser passada para armazenamento',
  })
  date: Date;

  @IsOptional()
  _id: string;

  constructor(comment?: Partial<Comment>) {
    this._id = comment?._id;
    this.name = comment?.name;
    this.email = comment?.email;
    this.movie_id = comment?.movie_id;
    this.text = comment?.text;
    this.date = comment?.date;
    this.isReply = comment?.isReply;
    this.likes = comment?.likes;
    this.comments = comment?.comments;
  }
}
