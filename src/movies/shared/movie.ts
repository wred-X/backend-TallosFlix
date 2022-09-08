import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Document } from 'mongoose';
export class Movie extends Document {
  @ApiProperty({
    example: 'era uma vez uma vez...',
    description: `Sinopse do filme.`,
  })
  @IsOptional()
  plot: string;

  @ApiProperty({
    example: ['Ação', 'Aventura'],
    description: `Genero do filme.`,
  })
  @IsNotEmpty({
    message: 'senha é obrigatório.',
  })
  genres: [string];

  @ApiProperty({
    example: 120,
    description: `Duração em minutos do filme.`,
  })
  @IsOptional()
  runtime: number;

  @ApiProperty({
    example: ['Brad Pitt', 'Tom Cruise', 'Jennifer Lawrence'],
    description: `Parte do elenco principal do filme.`,
  })
  @IsNotEmpty({
    message: 'Parte do elenco principal do filme é obrigatório.',
  })
  cast: [string];

  @ApiProperty({
    example: 5,
    description: `Numero de comentarios recebidos do filme na nossa API.`,
  })
  @IsOptional()
  num_mflix_comments: number;

  @ApiProperty({
    example: 'poster.png',
    description: `Poster do filme.`,
  })
  @IsOptional()
  poster: string;

  @ApiProperty({
    example: 'Tome Bala',
    description: `Nome do filme.`,
  })
  @IsNotEmpty({
    message: 'Nome do filme é obrigatório.',
  })
  title: string;

  @ApiProperty({
    example: 'Max que matou o Nilo.',
    description: `Spoiler da trama central do roteiro do filme.`,
  })
  @IsOptional()
  fullplot: string;

  @ApiProperty({
    example: 5,
    description: `Nota no metacritc.`,
  })
  @IsOptional()
  metacritic: number;

  @ApiProperty({
    example: ['Portuguese', 'English'],
    description: `Idiomas disponiveis para assistir o filme.`,
  })
  @IsNotEmpty({
    message: 'Idiomas disponiveis para assistir o filme é obrigatório.',
  })
  languages: [string];

  @ApiProperty({
    example: ['Brazil'],
    description: `País da produção do filme.`,
  })
  @IsNotEmpty({
    message: 'País da produção do filme é obrigatório.',
  })
  countries: [string];

  @ApiProperty({
    example: '2020-07-11T00:00:00.000+00:00',
    description: `Data de lançamento do filme`,
  })
  @IsOptional()
  realeased: Date;

  @ApiProperty({
    example: ['Tarantino', 'Christhofer Nolan'],
    description: `Diretor(es) do filme.`,
  })
  @IsNotEmpty({
    message: 'Diretor(es) do filme é obrigatório.',
  })
  directors: [string];

  @ApiProperty({
    example: 'Good',
    description: `Avaliação do filme.`,
  })
  @IsOptional()
  rated: string;

  @ApiProperty({
    example: 'Wins: 1; Nominations:4; text:1 win and 4 nominations',
    description: `Nominações e vitorias do filme a premiações da academia de artes e cinema.`,
  })
  @IsNotEmpty({
    message:
      'Nominações e vitorias do filme a premiações da academia de artes e cinema é obrigatório.',
  })
  awards: {
    wins: number;
    nominations: number;
    text: string;
  };

  @ApiProperty({
    example: '2021-07-11T00:00:00.000+00:00',
    description: 'Data da ultima atualização do filme na nossa API.',
  })
  @IsNotEmpty({
    message: 'Data da ultima atualização do filme na nossa API é obrigatório.',
  })
  lastupdadted: string;

  @ApiProperty({
    example: '2020',
    description: 'Ano de lançamento do filme.',
  })
  @IsNotEmpty({
    message: 'Ano de lançamento do filme é obrigatório.',
  })
  year: number;

  @ApiProperty({
    example: 'rating: 6; votes:200; id:1111',
    description:
      'Media de nota do filme a partir da votação de usuarios e critica da plataforma imdb.',
  })
  @IsNotEmpty({
    message:
      'Media de nota do filme a partir da votação de usuarios e critica da plataforma imdb é obrigatório.',
  })
  imdb: {
    rating: number;
    votes: number;
    id: number;
  };

  @ApiProperty({
    example: 'Movie',
    description: 'Tipo de dado, no caso, filmes.',
  })
  @IsNotEmpty({
    message: 'Tipo de dado, no caso, filmes é obrigatório.',
  })
  type: string;

  @ApiProperty({
    example:
      'Viewer: {rating: 6; numReviews: 150; meter:83}; dvd:2021-10-11T00:00:00.000+00:00; lastUpdated:2022-07-11T00:00:00.000+00:00; rotten:1; fresh: 12; critic:{ rating: 7.2; numReviews: 13; meter: 92;}',
    description:
      'Todas informações de notas, de usuarios e critica, além da data de lançamento do filme e data que o filme ficou disponivel em dvd',
  })
  @IsOptional()
  tomatoes: {
    viewer: {
      rating: number;
      numReviews: number;
      meter: number;
    };
    critic: {
      rating: number;
      numReviews: number;
      meter: number;
    };
    dvd: Date;
    lastUpdated: Date;
    rotten: number;
    fresh: number;
  };

  @ApiProperty({
    example: '2021-10-11T00:00:00.000+00:00',
    description: 'Data que o dvd do filme lançou.',
  })
  @IsOptional()
  dvd: Date;

  @ApiProperty({
    example: 12,
    description: 'fresh do filme.',
  })
  @IsOptional()
  fresh: number;

  @ApiProperty({
    example: 'Warner Brothers',
    description: 'Produtora do filme.',
  })
  @IsNotEmpty({
    message: 'Produtora do filme é obrigatório.',
  })
  production: string;

  @ApiProperty({
    example: 1,
    description: 'Quantidade de paginas no rotten tomatoes.',
  })
  @IsOptional()
  rotten: number;

  @ApiProperty({
    example: '2022-8-11T00:00:00.000+00:00',
    description: 'Data da ultima atualização do filme na nossa API.',
  })
  @IsNotEmpty({
    message: 'Data da ultima atualização do filme na nossa API.',
  })
  lastUpdated: Date;

  @ApiProperty({
    example: 'www.filme.com',
    description: 'Link do filme',
  })
  @IsOptional()
  website: string;

  @ApiProperty({
    example: ['Tarantino'],
    description: 'Roteirista(s) do filme.',
  })
  @IsOptional()
  writers: [string];
}
