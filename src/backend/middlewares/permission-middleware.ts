import { Request, Response, NextFunction } from "express";

import { CRMUser, PossibleRole, Role } from "../../database/models";

import { NotFoundError, UnauthorizedError } from "../utils";

export const permissionMiddleware = (...allowedRoles: PossibleRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.userId;

        const user = await CRMUser.findByPk(userId, { include: Role });

        if (!user) {
            throw new NotFoundError("User not found");
        }

        const isUserHasPermission = user.roles.some((role) => allowedRoles.includes(role.name));

        if (!isUserHasPermission) {
            throw new UnauthorizedError("No permissions");
        }

        next();
    };
};
