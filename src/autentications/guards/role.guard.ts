import { Role } from './../models/role.enum';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from '../decorators/role-decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    private jwtService = new JwtService();

    constructor(
        private readonly reflector: Reflector
    ) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {

        const req = context.switchToHttp().getRequest();
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ])
        if (!requiredRoles) {
            return true;
        }

        const token = req.headers.authorization;
        const payload = this.jwtService.decode(token.split(' ')[1], { json: true }) as { role: Role }
        return requiredRoles.some((role) => payload.role?.includes(role));
    }
}