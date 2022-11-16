import { forwardRef, Module } from '@nestjs/common';
import { SessionsController } from './controllers/sessions.controller';
import { SessionService } from './services/session.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionSchema } from './schemas/session.schema';
import { AutenticationsModule } from '../autentications/autentications.module';
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
