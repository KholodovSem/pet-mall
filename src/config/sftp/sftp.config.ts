import { registerAs } from "@nestjs/config";

export default registerAs("sftp", () => ({
    host: process.env.SFTP_HOST,
    port: process.env.SFTP_PORT,
    username: process.env.SFTP_USERNAME,
    password: process.env.SFTP_PASSWORD,
}));
