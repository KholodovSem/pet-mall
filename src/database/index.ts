import { Sequelize } from "sequelize";
import { config } from "../config";

export const sequelize = new Sequelize({
    dialect: "postgres",
    host: config.database.host,
    port: config.database.port,
    database: config.database.name,
    username: config.database.username,
    password: config.database.password,
});
