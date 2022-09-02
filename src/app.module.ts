import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { MoviesModule } from './movies/movies.module';
import { TheatersModule } from './theaters/theaters.module';
import { SessionsModule } from './sessions/sessions.module';
import { AutenticationsModule } from './autentications/autentications.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './autentications/guards/jwt-autentication.guard';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.USER_BD),
    // MongooseModule.forRoot(
    //   'mongodb://wesleysousa:lumia710@somngd01.cloud.dns.internal:27017,somngd02.cloud.dns.internal:27017,somngd03.cloud.dns.internal:27017/lucassantos?authMechanism=DEFAULT&replicaSet=rs0&readPreference=secondaryPreferred&authSource=admin'
    // ),
    UsersModule,
    CommentsModule,
    MoviesModule,
    TheatersModule,
    SessionsModule,
    AutenticationsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
