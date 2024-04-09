import dotenv from "dotenv";

dotenv.config();

export const config = {
    env: process.env.NODE_ENV || "development",
    port: parseInt(process.env.PORT || "3000"),
    jwtSecret: process.env.JWT_SECRET || "SOME_JWT_SECRET",
    database: {
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT || "5432"),
        name: process.env.DB_NAME || "postgres",
        username: process.env.DB_USERNAME || "admin",
        password: process.env.DB_PASSWORD || "postgres",
    },
    redis: {
        host: process.env.REDIS_HOST || "localhost",
        port: parseInt(process.env.REDIS_PORT || "6379"),
    },
};
