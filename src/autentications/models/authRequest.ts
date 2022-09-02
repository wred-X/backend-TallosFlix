import { Request } from 'express';
import { User } from 'src/users/shared/user';

export interface AuthRequest extends Request {
  user: User;
}
