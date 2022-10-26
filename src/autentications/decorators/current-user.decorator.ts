import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../users/shared/user';
import { AuthRequest } from '../models/authRequest';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  }
);
