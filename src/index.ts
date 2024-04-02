import { sequelize } from "./database";
import { server } from "./backend/server";
import { socket } from "./backend/socket";
import { Role, PossibleRole } from "./database/models";

import { config } from "./config";

const PORT = config.port;

//TODO: Seed db fn in separate file.
//TODO: Ask Maks about similar handlers in routes (manufacturer, tag, purpose).
//TODO: Product routes for crm
//TODO: Connect queue and worker to ... ???
//TODO: Websocket
//TODO: Microservice
//TODO: Nest.js

const connectDatabase = async () => {
    try {
        await sequelize.authenticate();

        await sequelize.sync({ force: true });

        await Role.bulkCreate(
            Object.values(PossibleRole).map((role) => ({
                name: role,
            }))
        );

        console.log("Successful connection to the database!");
    } catch (error) {
        console.log("Unable to connect to the database:");
        console.error(error);
        process.exit(1);
    }
};

const init = async () => {
    await connectDatabase();

    socket.on("connect", (socket) => {
        console.log("Socked: User connected");
    });

    server.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
};

init();
