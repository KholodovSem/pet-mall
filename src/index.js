require("dotenv").config();

const app = require("./backend/app");
const sequelize = require("./database");

const PORT = process.env.PORT || 3000;

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log("Successful connection to the database!");
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error.message);
    process.exit(1);
  }
};

const init = async () => {
  await connectDatabase();
  app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
};

init(console.log(require("./hui")));
