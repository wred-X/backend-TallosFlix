import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class Reply {
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
    description:
      'Array de resposta aos comentários, deve ir totalmente vazio: comments:[]',
  })
  comments: [];

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
}
