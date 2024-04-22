import * as Joi from "joi";

export default Joi.object({
    //App
    PORT: Joi.number().default(3000),
    ENV: Joi.string().default("development"),

    //Jwt
    JWT_SECRET: Joi.string().default("SOME_JWT_SECRET"),

    //Postgres
    POSTGRES_HOST: Joi.string().default("localhost"),
    POSTGRES_PORT: Joi.number().default(5432),
    POSTGRES_NAME: Joi.string().default("postgres"),
    POSTGRES_USERNAME: Joi.string().default("admin"),
    POSTGRES_PASSWORD: Joi.string().default("postgres"),

    //Mongo
    MONGO_HOST: Joi.string().default("localhost"),
    MONGO_PORT: Joi.number().default(27017),
    MONGO_USERNAME: Joi.string().default("admin"),
    MONGO_PASSWORD: Joi.string().default("mongo"),

    //Redis
    REDIS_HOST: Joi.string().default("localhost"),
    REDIS_PORT: Joi.number().default(6379),

    //Kafka
    KAFKA_HOST: Joi.string().default("localhost"),
    KAFKA_PORT: Joi.number().default(9092),

    //Sftp
    SFTP_HOST: Joi.string().default("localhost"),
    SFTP_PORT: Joi.number().default(2222),
    SFTP_USERNAME: Joi.string().default("admin"),
    SFTP_PASSWORD: Joi.string().default("root"),
});
