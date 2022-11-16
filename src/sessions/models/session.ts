import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class Session {
  @IsOptional()
  _id?: string;
  @ApiProperty({
    example: 'ID1234',
    description: `ID do user que entrou em sessão`,
  })
  @IsNotEmpty({
    message: 'ID do user que entrou em sessão é obrigatório.',
  })
  user_id: string;
  @ApiProperty({
    example: 'eyJWTEXAMPLEasjosdnaos13rr423423423JWTEXAMPLEJWTEXAMPLE',
    description: `O jwt da sessão atual do usuario.`,
  })
  @IsNotEmpty({
    message: 'jwt é obrigatório.',
  })
  jwt: string;

  constructor(todo?: Partial<Session>) {
    // this._id = todo?._id;
    // this.user_id = todo?.user_id;
    // this.jwt = todo?.jwt;

    Object.assign(this, todo);
  }
}
