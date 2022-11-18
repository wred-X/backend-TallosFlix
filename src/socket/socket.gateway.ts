import { Injectable } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Comment } from '../comments/shared/comment';
import { Movie } from '../movies/model/movie';
import { User } from '../users/shared/user';

@Injectable()
@WebSocketGateway(3008, {
  cors: {
    origin: '*',
  },
})
export class SocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    server.on('connect', (socket: Socket) => {
      console.log('connected: ', socket.id);
    });

    server.on('disconnect', (socket: Socket) => {
      console.log('socket disconnected: ', socket.id);
    });
  }

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string) {
    this.server.emit('events', data);
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('User connected');
  }

  handleDisconnect(client: any) {
    console.log('User disconnected');
  }

  emitUserLogged(_id: User) {
    console.log('emiti o evento no login', { _id });
    this.server.emit('is-logged', { _id });
  }

  emitNewComment(comment: Comment) {
    console.log('emiti o evento de comment', { comment });
    this.server.emit('new-comment', { comment });
  }
  emitComentUpdated(comment: Comment) {
    this.server.emit('update-comment', { comment });
  }

  emitComentDeleted(id: string) {
    this.server.emit('deleted-comment', { id });
  }
  emitNewFavorite(movie: Movie, _id: User) {
    this.server.emit('new-favorited', { movie, _id });
  }

  emitnewLike(liked: any) {
    this.server.emit('new-liked', { liked });
  }
  emitAllLikes(liked: any) {
    this.server.emit('all-likes', { liked });
  }
}
