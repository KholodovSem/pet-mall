import { Server, Socket } from "socket.io";
import { IncomingMessage } from "http";
import jwt from "jsonwebtoken";

import { server } from "../server";
import { config } from "../../config";

import { BadRequestError } from "../utils";

type ExtendedError = Error & { data?: any };

const socketAuthMiddleware = (
    socket: Socket,
    next: (extendedError?: ExtendedError) => void
): void => {
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

export const socket = new Server(server);

socket.use(socketAuthMiddleware);
