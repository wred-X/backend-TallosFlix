import { Role } from './role.enum';
export interface UserPayload {
  sub: string;
  email: string;
  name: string;
  role: Role;
  avatar: string;
  iat?: number;
  exp?: number;
}
