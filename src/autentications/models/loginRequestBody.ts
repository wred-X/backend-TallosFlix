import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestBody {
  @ApiProperty({
    example: 'email@email.com',
    description: `O e-mail é necessário para o login.`,
  })
  @IsEmail({ message: 'Email precisa ser um endereço de email válido.' })
  email: string;

  @ApiProperty({
    example: '1234@Abc',
    description: `Para login usando o e-mail diretamente é necessário informar uma senha.`,
  })
  @IsNotEmpty({
    message: 'senha é obrigatório.',
  })
  @IsString()
  password: string;

  constructor(todo?: Partial<LoginRequestBody>) {
    // this.email = todo?.email;
    // this.password = todo?.password;
    Object.assign(this, todo)

  }
}
