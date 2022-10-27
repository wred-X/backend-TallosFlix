import { Request } from 'express';
import { User } from '../../users/shared/user';

export interface AuthRequest extends Request {
  user: User;
}
