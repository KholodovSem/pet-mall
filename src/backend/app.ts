import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import { router as userController } from './user/user-controller';
import { router as productController } from './product/product-controller';

import { errorHandlerMiddleware } from './middlewares';

export const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.use("/api/auth", userController);
app.use("/api/products", productController);

app.use(errorHandlerMiddleware());
