import { IsEmail, IsString } from 'class-validator';

export class LoginRequestBody {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  constructor(todo?: Partial<LoginRequestBody>) {
    this.email = todo?.email;
    this.password = todo?.password;
  }
}
