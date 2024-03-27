import dotenv from "dotenv";

dotenv.config();

export const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || "3000",
    jwtSecret: process.env.JWT_SECRET || "",
    database: {
        password: process.env.POSTGRES_PASSWORD || '',
    }
};

