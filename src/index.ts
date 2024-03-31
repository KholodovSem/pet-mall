import { sequelize } from "./database";
import { app } from "./backend/app";

import { Role, PossibleRole } from "./database/models";

import { config } from "./config";

const PORT = config.port;

const connectDatabase = async () => {
    try {
        await sequelize.authenticate();

        await sequelize.sync();

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
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
};

init();
