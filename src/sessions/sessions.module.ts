import { Module } from '@nestjs/common';
import { SessionsController } from './sessions.controller';
import { SessionService } from './shared/session.service';

@Module({
  controllers: [SessionsController],
  providers: [SessionService]
})
export class SessionsModule {}
