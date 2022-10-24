import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean } from 'class-validator';

export class Reply {
  @IsBoolean({
    message: 'Define se é resposta ou comentario principal',
  })
  isReply: Boolean;

  @ApiProperty({
    example: 'Eu não concordei com seu comentário',
    description: 'Array de resposta aos comentários',
  })
  @IsArray({
    message: 'Array de respostas',
  })
  comments: String[];
}
