import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class Rate {
  @ApiProperty({
    example: 5,
    description: `nota desse usuario.`,
  })
  @IsNotEmpty({
    message: 'nota é obrigatoria para ser gerada avaliação.',
  })
  rate: number;

  @ApiProperty({
    example: '1userID1',
    description: `Id para referenciar a qual user pertence a nota.`,
  })
  @IsNotEmpty({
    message: 'Id do user é obrigatorio para saber a qual user pertence a nota.',
  })
  user_id: string;

  constructor(todo?: Partial<Rate>) {
    // this.user_id = todo?.user_id;
    // this.rate = todo?.rate;
    Object.assign(this, todo)
  }
}
