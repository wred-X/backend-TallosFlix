import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/users/shared/user';
import { AuthRequest } from '../models/AuthRequest';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  }
);
