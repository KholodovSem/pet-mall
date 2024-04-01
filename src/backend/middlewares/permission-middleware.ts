import { Request, Response, NextFunction } from "express";

import { CRMUser, PossibleRole, Role } from "../../database/models";

import { UnauthorizedError } from "../utils";

export const permissionMiddleware = (...allowedRoles: PossibleRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.userId;

            const user = await CRMUser.findByPk(userId, { include: Role });

            if (!user) {
                throw new UnauthorizedError("No permissions");
            }

            const isUserHasPermission = user?.roles.some((role) =>
                allowedRoles.includes(role.name)
            );

            console.log("User:", JSON.stringify(user));

            if (!isUserHasPermission) {
                throw new UnauthorizedError("No permissions");
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};
