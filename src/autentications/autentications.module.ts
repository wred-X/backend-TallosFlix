import { Module } from '@nestjs/common';
import { AutenticationService } from './shared/autentication.service';

@Module({
  providers: [AutenticationService],
})
export class AutenticationsModule {}
