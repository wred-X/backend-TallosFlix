import { Document } from 'mongoose';
import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
// import { Expose } from 'class-transformer';

export class User {
  _id: string;
  // @Expose({ name: 'Nome' })
  @IsNotEmpty({
    message: 'Nome Completo é obrigatório.',
  })
  name: string;

  // @Expose({
  //   name: 'Email',
  // })
  @IsEmail({ message: 'Email precisa ser um endereço de email válido.' })
  @IsNotEmpty({
    message: 'Email é obrigatório.',
  })
  email: string;

  // @Expose({
  //   name: 'Senha',
  // })
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
