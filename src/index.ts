import { sequelize } from "./database/models";
import { app } from './backend/app';

import { config } from './config';

const PORT = config.port;

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
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
