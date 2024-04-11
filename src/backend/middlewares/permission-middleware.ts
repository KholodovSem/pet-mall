import { Request, Response, NextFunction } from "express";

import { CRMUser, Role } from "../../database/models";

import { UnauthorizedError } from "../utils";

import { PossibleRole } from "../../common";

export const permissionMiddleware = (...allowedRoles: PossibleRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.userId;

            const user = await CRMUser.findByPk(userId, { include: Role });

            if (!user) {
                throw new UnauthorizedError("No permissions");
            }

            const isUserHasPermission = user?.roles.some(
                (role) =>
                    role.name === PossibleRole.ADMIN ||
                    allowedRoles.includes(role.name)
            );

            if (!isUserHasPermission) {
                throw new UnauthorizedError("No permissions");
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};
