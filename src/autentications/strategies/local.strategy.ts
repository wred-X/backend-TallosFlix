import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AutenticationService } from '../shared/autentication.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private autenticationService: AutenticationService) {
    super({ usernameField: 'email' });
  }

  validate(email: string, password: string) {
    return this.autenticationService.validateUser(email, password);
  }
}
