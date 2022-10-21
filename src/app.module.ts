import { FavoritesModule } from './favorites/favorites.module';
import { SocketGateway } from './socket/socket.gateway';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { MoviesModule } from './movies/movies.module';
import { TheatersModule } from './theaters/theaters.module';
import { SessionsModule } from './sessions/sessions.module';
import { AutenticationsModule } from './autentications/autentications.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './autentications/guards/jwt-autentication.guard';
import { SocketTestModule } from './socket/socket.module';

@Module({
  imports: [
    FavoritesModule,
    MongooseModule.forRoot(process.env.USER_BD),
    UsersModule,
    CommentsModule,
    MoviesModule,
    TheatersModule,
    SessionsModule,
    AutenticationsModule,
    SocketTestModule,
  ],
  providers: [
    SocketGateway,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
