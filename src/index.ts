import "reflect-metadata";

import { server } from "./backend/server";
import { connectDatabase } from "./database";
import { redis } from "./redis";
import { handleSolanaPrice } from "./kafka/handlers";
import { connectSftp } from "./sftp";
import { NotificationService } from "./socket/services";
import { changeOrderTask } from "./scheduler";

import { config } from "./config";

import { container } from "./ioc/inversify.config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

import { ValidationPipe } from "@nestjs/common";

const notificationService = container.get<NotificationService>(NotificationService);

const PORT = config.port;

//TODO: Read about swagger
//TODO: Logger
//TODO: How to share root files (kind of configs) between projects?

const init = async () => {
    await connectDatabase();
    await redis.connect();
    await connectSftp();
    server.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

    notificationService.init();
    changeOrderTask.start();
    handleSolanaPrice();
};

const bootstrap = async () => {
    const app = await NestFactory.create(AppModule);

    const validationPipe = new ValidationPipe({
        whitelist: true,
        transform: true,
    });
    app.useGlobalPipes(validationPipe);

    const configService = app.get(ConfigService);
    const port = configService.get("app.port");

    app.listen(port);
};

bootstrap();
