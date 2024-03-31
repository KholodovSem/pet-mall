import { Sequelize } from "sequelize";
import { config } from "../config";

export const sequelize = new Sequelize({
    dialect: "postgres",
    storage: "postgres:5432/postgres",
    host: "localhost",
    username: "postgres",
    password: config.database.password,
    // logging: false,
});
