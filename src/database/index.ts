import { Sequelize } from "sequelize";
import mongoose from "mongoose";
import { config } from "../config";

export const sequelize = new Sequelize({
    dialect: "postgres",
    host: config.postgres.host,
    port: config.postgres.port,
    database: config.postgres.name,
    username: config.postgres.username,
    password: config.postgres.password,
});

const connectPostgres = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("Successful connection to the postgres!");
    } catch (error) {
        console.log("Unable to connect to the postgres:");
        console.error(error);
        process.exit(1);
    }
};

const connectMongo = async () => {
    try {
        const uri = `mongodb://${config.mongo.username}:${config.mongo.password}@${config.mongo.host}:${config.mongo.port}/admin`;
        await mongoose.connect(uri);
        console.log("Successful connection to the mongo!");
    } catch (error) {
        console.log("Unable to connect to the mongo:");
        console.error(error);
        process.exit(1);
    }
};

export const connectDatabase = async () => {
    await connectPostgres();
    await connectMongo();
};
