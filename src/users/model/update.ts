import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Update {
  @ApiProperty({
    example: 'Wesley Romão',
    description: `O nome será utilizado para qualquer coisa (Perfil, Home Page, etc) que precise exibir informações da pessoa conectada.`,
  })
  @IsOptional()
  name: string;

  // @Expose({
  //   name: 'Email',
  // })
  @ApiProperty({
    example: 'email@email.com',
    description: `O e-mail é necessário para o login.`,
  })
  @IsEmail({ message: 'Email precisa ser um endereço de email válido.' })
  @IsOptional()
  email: string;

  // @Expose({
  //   name: 'Senha',
  // })
  @ApiProperty({
    example: '1234@Abc',
    description: `Para login usando o e-mail diretamente é necessário informar uma senha.`,
  })
  @IsOptional()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'A senha está fraca',
  })
  password: string;

  @ApiProperty({
    example: '',
    description: `Enviar avatar vazio sempre na criação, e novo valor ao editar.`,
  })
  @IsOptional()
  avatar?: string;
}
