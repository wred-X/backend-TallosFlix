import { RolesGuard } from './guards/role.guard';
import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { LoginValidationMiddleware } from './middlewares/login-validation.middleware';
import { UsersModule } from 'src/users/users.module';
import { AutenticationsController } from './autentications.controller';
import { AutenticationService } from './shared/autentication.service';
import { ConfigService } from '@nestjs/config/dist';
import { SessionsModule } from 'src/sessions/sessions.module';
import { SocketGateway } from 'src/socket/socket.gateway';
import { SocketTestModule } from 'src/socket/socket.module';


@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => SessionsModule),
    PassportModule,
    SocketTestModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AutenticationsController],
  providers: [
    AutenticationService,
    LocalStrategy,
    ConfigService,
    JwtStrategy,
    SocketGateway,
    RolesGuard
  ],
  })
export class AutenticationsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
  }
}
