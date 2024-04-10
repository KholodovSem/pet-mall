import SftpServer from "ssh2-sftp-client";

import { config } from "../config";

export const sftp = new SftpServer();

export const connectSftp = async () => {
    try {
        await sftp.connect({
            host: config.sftp.host,
            port: config.sftp.port,
            username: config.sftp.username,
            password: config.sftp.password,
        });
        console.log("Successful connection to the sfpt!");
    } catch (error) {
        console.log("Unable to connect to the sftp:");
        console.error(error);
        process.exit(1);
    }
};
