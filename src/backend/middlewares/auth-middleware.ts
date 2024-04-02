import { type Handler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { ForbiddenError } from "../utils";
import { config } from "../../config";

export const authMiddleware: Handler = (req, _, next) => {
    try {
        if (!req.headers.authorization) {
            throw new ForbiddenError("Token not provided");
        }

        const [__, token] = req.headers.authorization.split(" ");

        const decodedToken = jwt.verify(
            token,
            config.jwtSecret
        ) as JwtPayload & { userId: number };

        console.log('Token: ', JSON.stringify(decodedToken));


        req.userId = decodedToken.userId;

        next();
    } catch (error) {
        next(error);
    }
};
