import { Role } from './../../autentications/models/role.enum';
import { Document } from 'mongoose';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
// import { Expose } from 'class-transformer';

export class User {
  @IsOptional()
  _id?: string;
  @ApiProperty({
    example: 'Wesley Romão',
    description: `O nome será utilizado para qualquer coisa (Perfil, Home Page, etc) que precise exibir informações da pessoa conectada.`,
  })
  @IsNotEmpty({
    message: 'Nome Completo é obrigatório.',
  })
  name: string;

  @ApiProperty({
    example: 'email@email.com',
    description: `O e-mail é necessário para o login.`,
  })
  @IsEmail({ message: 'Email precisa ser um endereço de email válido.' })
  @IsNotEmpty({
    message: 'Email é obrigatório.',
  })
  email: string;

  @ApiProperty({
    example: '1234@Abc',
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

  @ApiProperty({
    example: '',
    description: `Enviar avatar vazio sempre na criação.`,
  })
  @IsOptional()
  avatar?: string;

  @Prop({ required: true })
  @ApiProperty({
    description: 'Cargo do usuário',
    type: String,
    example: 'admin',
  })
  @IsNotEmpty({
    message: 'Informe o cargo do usuário',
  })
  role?: Role;
  constructor(todo?: Partial<User>) {
    // this._id = todo?._id;
    // this.avatar = todo?.avatar;
    // this.name = todo?.name;
    // this.email = todo?.email;
    // this.password = todo?.password;
    // this.role = todo?.role;
    Object.assign(this, todo)
  }
}
