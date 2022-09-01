import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { MoviesModule } from './movies/movies.module';
import { TheatersModule } from './theaters/theaters.module';
import { SessionsModule } from './sessions/sessions.module';
import { AutenticationModule } from './autentication/autentication.module';

@Module({
  imports: [
    UsersModule,
    CommentsModule,
    MoviesModule,
    TheatersModule,
    SessionsModule,
    AutenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
