import { User } from '../../users/shared/user';

export class UserSession {
  _id?: string;
  user_id: string;
  jwt: string;
}
