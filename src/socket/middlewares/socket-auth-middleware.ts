import { Socket } from "socket.io";
import jwt from "jsonwebtoken";

import { config } from "../../config";

import { BadRequestError } from "../../backend/utils";

type ExtendedError = Error & { data?: any };

type SocketMiddleware = (
    socket: Socket,
    next: (extendedError?: ExtendedError) => void
) => void;

export const socketAuthMiddleware: SocketMiddleware = (socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
        return next(new BadRequestError("Token not provided"));
    }

    try {
        jwt.verify(token, config.jwtSecret);
        next();
    } catch (error) {
        if (error instanceof Error) {
            return next(error);
        }

        next(new Error("Unknown server error"));
    }
};
