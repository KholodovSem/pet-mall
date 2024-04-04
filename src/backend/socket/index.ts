import { Server as SocketServer } from "socket.io";

import { server } from "../server";

import { socketAuthMiddleware } from "./middlewares";

export const socketServer = new SocketServer(server, {
    cors: {
        origin: "*",
    },
});

socketServer.use(socketAuthMiddleware);
