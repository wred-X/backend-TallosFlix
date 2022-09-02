import { Document } from 'mongoose';
import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// import { Expose } from 'class-transformer';

export class User {
  _id: string;
  // @Expose({ name: 'Nome' })
  @ApiProperty({
    example: 'Wesley Romão',
    description: `O nome será utilizado para qualquer coisa (Perfil, Home Page, etc) que precise exibir informações da pessoa conectada.`,
  })
  @IsNotEmpty({
    message: 'Nome Completo é obrigatório.',
  })
  name: string;

  // @Expose({
  //   name: 'Email',
  // })
  @ApiProperty({
    example: 'email@email.com',
    description: `O e-mail é necessário para o login.`,
  })
  @IsEmail({ message: 'Email precisa ser um endereço de email válido.' })
  @IsNotEmpty({
    message: 'Email é obrigatório.',
  })
  email: string;

  // @Expose({
  //   name: 'Senha',
  // })
  @ApiProperty({
    example: '123@abc',
    description: `Para login usando o e-mail diretamente é necessário informar uma senha.`,
  })
  @IsNotEmpty({
    message: 'senha é obrigatório.',
  })
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'A senha está fraca',
  })
  password: string;
}
