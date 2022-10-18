import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class Update {
  @IsOptional()
  _id?: string;

  @ApiProperty({
    example: 'email@email.com',
    description: `Id dos filmes adicionado aos favoritos desse usuario.`,
  })
  @IsNotEmpty({
    message:
      'Id do filme é obrigatorio para ser adicionado como favorito do usuario.',
  })
  movie_Id: string;
}
