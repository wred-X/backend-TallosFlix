import { forwardRef, Module } from '@nestjs/common';
import { SessionsController } from './sessions.controller';
import { SessionService } from './shared/session.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionSchema } from './schemas/session.schema';
import { AutenticationsModule } from 'src/autentications/autentications.module';
@Module({
  imports: [
    forwardRef(() => AutenticationsModule),
    MongooseModule.forFeature([{ name: 'Session', schema: SessionSchema }]),
  ],
  controllers: [SessionsController],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionsModule {}
