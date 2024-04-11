import dotenv from "dotenv";

dotenv.config();

export const config = {
    env: process.env.NODE_ENV || "development",
    port: parseInt(process.env.PORT || "3001"),
    jwtSecret: process.env.JWT_SECRET || "SOME_JWT_SECRET",
    postgres: {
        host: process.env.POSTGRES_HOST || "localhost",
        port: parseInt(process.env.POSTGRES_PORT || "5432"),
        name: process.env.POSTGRES_NAME || "postgres",
        username: process.env.POSTGRES_USERNAME || "admin",
        password: process.env.POSTGRES_PASSWORD || "postgres",
    },
    mongo: {
        host: process.env.MONGO_HOST || "localhost",
        port: parseInt(process.env.MONGO_PORT || "27017"),
        username: process.env.MONGO_USERNAME || "admin",
        password: process.env.MONGO_PASSWORD || "mongo",
    },
    redis: {
        host: process.env.REDIS_HOST || "localhost",
        port: parseInt(process.env.REDIS_PORT || "6379"),
    },
    kafka: {
        host: process.env.KAFKA_HOST || "localhost",
        port: process.env.KAFKA_PORT || "9092",
    },
    sftp: {
        host: process.env.SFTP_HOST || "localhost",
        port: parseInt(process.env.SFTP_PORT || "2222"),
        username: process.env.SFTP_USERNAME || "admin",
        password: process.env.SFTP_PASSWORD || "root",
    },
};
