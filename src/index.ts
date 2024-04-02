import { sequelize } from "./database";
import { server } from "./backend/server";
import { changeOrderTask } from './backend/scheduler';

import { config } from "./config";

const PORT = config.port;

//TODO: Product routes for crm
//TODO: Websocket (test (codesandbox))
//TODO: Microservice
//TODO: Nest.js
//TODO: Is auth middleware handle case when token is expire? 

const connectDatabase = async () => {
    try {
        await sequelize.authenticate();

        await sequelize.sync({ force: true });

        console.log("Successful connection to the database!");
    } catch (error) {
        console.log("Unable to connect to the database:");
        console.error(error);
        process.exit(1);
    }
};

const init = async () => {
    await connectDatabase();

    server.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

    changeOrderTask.start();
};

init();
