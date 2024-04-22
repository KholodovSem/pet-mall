import {
    CanActivate,
    ExecutionContext,
    Injectable,
    SetMetadata,
    UseGuards,
    applyDecorators,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";

import { Roles } from "../decorators/roles.decorator";
import { PossibleRole } from "../constants";

@Injectable()
class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext) {
        const handlerRoles = this.reflector.get(Roles, context.getHandler());

        const request = context.switchToHttp().getRequest<Request>();
        const userRoles = request.user?.roles || [];

        return this.matchRoles(handlerRoles, userRoles);
    }

    private matchRoles(handlerRoles: string[], userRoles: string[]) {
        return userRoles.some((role) => handlerRoles.includes(role));
    }
}

export const PermissionGuard = (...roles: PossibleRole[]) =>
    applyDecorators(SetMetadata("roles", roles), UseGuards(RolesGuard));
