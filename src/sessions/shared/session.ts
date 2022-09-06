import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
// import { Expose } from 'class-transformer';

export class Session {
  user_id: string;
  jwt: string;
}
