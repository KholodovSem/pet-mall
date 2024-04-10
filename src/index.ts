import "reflect-metadata";

import { server } from "./backend/server";
import { connectDatabase } from "./database";
import { redis } from "./redis";
import { connectSftp } from "./sftp";
import { NotificationService } from "./socket/services";
import { changeOrderTask } from "./scheduler";

import { config } from "./config";

import { container } from "./ioc/inversify.config";

const notificationService =
    container.get<NotificationService>(NotificationService);

const PORT = config.port;

//TODO: Product routes for crm
//TODO: Websocket (test (codesandbox))
//TODO: Microservice
//TODO: Nest.js
//TODO: As for the cascade when the tag is removed
//TODO: Logger

const init = async () => {
    await connectDatabase();
    await redis.connect();
    await connectSftp();
    server.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
    notificationService.init();

    changeOrderTask.start();
};

init();
