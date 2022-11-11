import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class Favorite {
  @IsOptional()
  _id?: string;

  @ApiProperty({
    example: '1userID1',
    description: `Id para referenciar o usuario a qual pertence a lista de favoritos.`,
  })
  @IsNotEmpty({
    message: 'Id é obrigatorio para saber a quem pertence esse favoritos.',
  })
  user_Id: string;

  @ApiProperty({
    example: ['1filmeID1'],
    description: `Id dos filmes adicionado aos favoritos desse usuario.`,
  })
  @IsNotEmpty({
    message:
      'Id do filme é obrigatorio para ser adicionado como favorito do usuario.',
  })
  movie_Id: string[];

  constructor(todo?: Partial<Favorite>) {
    // this._id = todo?._id;
    // this.user_Id = todo?.user_Id;
    // this.movie_Id = todo?.movie_Id;

    Object.assign(this, todo)
  }
}
