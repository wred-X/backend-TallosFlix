import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/shared/user';
import { UserService } from 'src/users/shared/user.service';
import { SessionService } from 'src/sessions/shared/session.service';
import { UnauthorizedError } from '../errors/unauthorized.error';
import { UserPayload } from '../models/userPayload';
import { UserSession } from '../models/userSession';
import { UserToken } from '../models/userToken';
import { SocketGateway } from 'src/socket/socket.gateway';

@Injectable()
export class AutenticationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
    private readonly configService: ConfigService,
    private readonly socketId: SocketGateway,

  ) {}

  async login(user: User): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user._id,
      email: user.email,
      name: user.name,
    };

    const userInfo = user._id;

    const access = this.jwtService.sign(payload);

    const session: UserSession = {
      user_id: userInfo,
      jwt: access,
    };

    await this.sessionService.create(session);

    return {
      access_token: access,
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      this.socketId.emitUserLogged(user);
      if (isPasswordValid) {
        return user;
      }
    }

    throw new UnauthorizedError(
      'Email address or password provided is incorrect.'
    );
  }

  public async getUserFromAuthToken(token: string) {
    const payload: UserPayload = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
    if (payload.sub) {
      return this.userService.getById(payload.sub);
    }
  }
}
