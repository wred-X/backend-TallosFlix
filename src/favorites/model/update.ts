import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateFavorite {
  @IsOptional()
  _id?: string;

  @ApiProperty({
    example: 'id123defilme123',
    description: `Id dos filmes adicionado aos favoritos desse usuario.`,
  })
  @IsNotEmpty({
    message:
      'Id do filme é obrigatorio para ser adicionado como favorito do usuario.',
  })
  movie_Id: string;
}
