import { Server as SocketServer, Socket } from "socket.io";
import { inject, injectable } from "inversify";

import { TYPES } from "../../ioc/types";

@injectable()
export class NotificationService {
    private connectedUsers: Map<string, Socket>;

    constructor(
        @inject(TYPES.SocketServer) private socketServer: SocketServer
    ) {
        this.connectedUsers = new Map<string, Socket>();

        this.socketServer = socketServer;
    }

    init() {
        console.log("Notification service is running");

        this.socketServer.on("connect", (socket) => {
            socket.on("login", (userId) => {
                this.connectedUsers.set(`${userId}`, socket);
                console.log(`New connection: ${userId}`);
            });

            socket.on("disconnect", () => {
                this.connectedUsers.forEach((userSocket, userId) => {
                    if (userSocket.id === socket.id) {
                        this.connectedUsers.delete(userId);
                    }
                });
            });
        });
    }

    notify(userId: string | number, msg: string) {
        const socket = this.connectedUsers.get(`${userId}`);

        if (!socket) {
            console.log(`No connections found at the specified id`);
            return;
        }

        socket.emit("notification", msg);
    }
}
