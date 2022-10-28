import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Optional } from '@nestjs/common';

export class People {
  @IsOptional()
  _id?: string;

  @ApiProperty({
    example: {
      height: 576,
      url: 'https://m.media-amazon.com/images/M/MV5BMTc4OTMyNzMxNF5BMl5BanBnXkFtZT…',
      width: 461,
    },
    description: `Foto do ator + medidas da foto em questão`,
  })
  @IsOptional()
  image: object;

  @ApiProperty({
    example: 'Brad Pitt',
    description: `O nome será utilizado para identificar ator.`,
  })
  @IsNotEmpty({
    message: 'Nome Completo é obrigatório.',
  })
  name: string;

  @ApiProperty({
    example: '2000-01-01',
    description: `Data de nascimento`,
  })
  @IsOptional()
  birthDate: string;

  @ApiProperty({
    example: '2020-01-01',
    description: `Data de falecimento (caso ja tenha morrido)`,
  })
  @IsOptional()
  deathDate: string;

  @ApiProperty({
    example: 'EUA',
    description: `Para login usando o e-mail diretamente é necessário informar uma senha.`,
  })
  @IsOptional()
  birthPlace: string;

  @ApiProperty({
    example: 'male',
    description: `Homem ou mulher.`,
  })
  @IsOptional()
  gender: string;

  @ApiProperty({
    example: '40',
    description: `Idade do ator.`,
  })
  @IsOptional()
  heightCentimeters: number;

  @ApiProperty({
    example: 'Ele fez isso e aquilo depois de...',
    description: `Mini Biografia.`,
  })
  @IsOptional()
  miniBios: string;

  constructor(todo?: Partial<People>) {
    this._id = todo?._id;
    this.gender = todo?.gender;
    this.name = todo?.name;
    this.birthDate = todo?.birthDate;
    this.birthPlace = todo?.birthPlace;
    this.deathDate = todo?.deathDate;
    this.heightCentimeters = todo?.heightCentimeters;
    this.miniBios = todo?.miniBios;
  }
}
