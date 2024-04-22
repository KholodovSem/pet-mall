import { registerAs } from "@nestjs/config";

export default registerAs("postgres", () => ({
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || ""),
    name: process.env.POSTGRES_NAME,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
}));
