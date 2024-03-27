import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import { errorHandlerMiddleware } from './middlewares';

import { config } from '../config';

export const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.use("/api/auth", require("./routes/auth"));


if (config.env === "development") {
  // only use in development
  app.use(errorHandlerMiddleware());
}

