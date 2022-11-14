import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AutenticationsModule } from './autentications/autentications.module';
import { JwtAuthGuard } from './autentications/guards/jwt-autentication.guard';
import { CommentsModule } from './comments/comments.module';
import { FavoritesModule } from './favorites/favorites.module';
import { LikesModule } from './likes/likes.module';
import { MoviesModule } from './movies/movies.module';
import { PeoplesModule } from './peoples/peoples.module';
import { RatingsModule } from './ratings/ratings.module';
import { SessionsModule } from './sessions/sessions.module';
import { SocketGateway } from './socket/socket.gateway';
import { SocketTestModule } from './socket/socket.module';
import { TheatersModule } from './theaters/theaters.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    PeoplesModule,
    LikesModule,
    FavoritesModule,
    MongooseModule.forRoot(process.env.USER_BD),
    UsersModule,
    CommentsModule,
    MoviesModule,
    TheatersModule,
    SessionsModule,
    AutenticationsModule,
    SocketTestModule,
    RatingsModule,
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
