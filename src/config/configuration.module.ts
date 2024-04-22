import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import appConfig from "./app/app.config";
import jwtConfig from "./jwt/jwt.config";
import postgresConfig from "./db/postgres.config";
import mongoConfig from "./db/mongo.config";
import redisConfig from "./redis/redis.config";
import kafkaConfig from "./kafka/kafka.config";
import sftpConfig from "./sftp/sftp.config";

import configValidation from "./config.validation";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [
                appConfig,
                jwtConfig,
                postgresConfig,
                mongoConfig,
                redisConfig,
                kafkaConfig,
                sftpConfig,
            ],
            validationSchema: configValidation,
            isGlobal: true,
        }),
    ],
})
export class ConfigurationModule {}
