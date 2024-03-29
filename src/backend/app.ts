import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

import { router as userController } from "./user/user-controller";
import { router as productController } from "./product/product-controller";
import { router as orderController } from "./order/order-controller";

import { errorHandlerMiddleware, routeHandlerMiddleware } from "./middlewares";
import { notFound } from "./not-found";
import { BadRequestError } from "./utils";

export const app = express();

app.use(bodyParser.json());

app.use("/api/auth", userController);
app.use("/api/products", productController);
app.use("/api/orders", orderController);

app.use("*", routeHandlerMiddleware(notFound));

app.use(errorHandlerMiddleware);


