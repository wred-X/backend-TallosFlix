import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Rate } from '../models/rate';

export class Rating {
  @IsOptional()
  _id?: string;
  @ApiProperty({
    example: '1movieID1',
    description: `Id para referenciar o filme a qual pertence a nota.`,
  })
  @IsNotEmpty({
    message: 'Id é obrigatorio para saber a quem pertence a nota.',
  })
  movie_id: string;

  @ApiProperty({
    example: [{ rate: 5, user_id: 'idDEusuario123' }],
    description: `Id dos filmes adicionado aos favoritos desse usuario.`,
  })
  @IsNotEmpty({
    message:
      'Id do filme é obrigatorio para ser adicionado como favorito do usuario.',
  })
  allRate: Rate[];

  constructor(todo?: Partial<Rating>) {
    // this._id = todo?._id;
    // this.allRate = todo?.allRate;
    // this.movie_id = todo?.movie_id;
    Object.assign(this, todo)

  }
}
