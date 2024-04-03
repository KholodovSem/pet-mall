import { type Handler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { BadRequestError, ForbiddenError } from "../utils";
import { config } from "../../config";

export const authMiddleware: Handler = (req, _, next) => {
    try {
        if (!req.headers.authorization) {
            throw new ForbiddenError("Token not provided");
        }

        if (!req.headers.authorization.startsWith("Bearer")) {
            throw new BadRequestError("Invalid authorization header");
        }

        const [__, token] = req.headers.authorization.split(" ");

        const decodedToken = jwt.verify(
            token,
            config.jwtSecret
        ) as JwtPayload & { userId: number };

        req.userId = decodedToken.userId;

        next();
    } catch (error) {
        next(error);
    }
};
