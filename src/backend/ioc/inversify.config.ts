import { Server as SocketServer } from "socket.io";
import { Container } from "inversify";

import { socketServer } from "../socket";
import { NotificationService } from "../socket/services";

import { TYPES } from "./types";

export const container = new Container();

container.bind<SocketServer>(TYPES.SocketServer).toConstantValue(socketServer);
container
    .bind<NotificationService>(NotificationService)
    .toSelf()
    .inSingletonScope();
