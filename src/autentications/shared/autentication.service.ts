import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../../users/shared/user';
import { UserService } from '../../users/services/user.service';
import { SessionService } from '../../sessions/services/session.service';
import { UnauthorizedError } from '../errors/unauthorized.error';
import { UserPayload } from '../models/userPayload';
import { UserSession } from '../models/userSession';
import { UserToken } from '../models/userToken';
import { SocketGateway } from '../../socket/socket.gateway';

@Injectable()
export class AutenticationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
    private readonly configService: ConfigService,
    private readonly socket: SocketGateway
  ) {}

  async login(user: User): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
    };

    const userInfo = user._id;
    try {
      const access = this.jwtService.sign(payload);

      const session: UserSession = {
        _id: null,
        user_id: userInfo,
        jwt: access,
      };

      await this.sessionService.create(session);

      return {
        access_token: access,
      };
    } catch {
      throw new HttpException('Check all datas', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        this.socket.emitUserLogged(user);
        return user;
      }
    }

    throw new UnauthorizedError(
      'Email address or password provided is incorrect.'
    );
  }

  public async getUserFromAuthToken(token: string) {
    try {
      const payload: UserPayload = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      });
      if (payload.sub) {
        return this.userService.getById(payload.sub);
      }
    } catch {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
