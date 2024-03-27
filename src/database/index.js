const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "postgres",
  storage: "postgres:5432/postgres",
  host: "localhost",
  username: "postgres",
  password: process.env.POSTGRES_PASSWORD,
});

module.exports = sequelize;
