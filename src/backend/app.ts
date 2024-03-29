import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

import { userController, productController, orderController } from "./routes/client";
import { crmUserController } from "./routes/crm";

import { errorHandlerMiddleware, routeHandlerMiddleware } from "./middlewares";
import { notFound } from "./not-found";
import { BadRequestError } from "./utils";

export const app = express();

app.use(bodyParser.json());

app.use("/api/auth", userController);
app.use("/api/products", productController);
app.use("/api/orders", orderController);

app.use("/crm/auth", crmUserController);

app.use("*", routeHandlerMiddleware(notFound));

app.use(errorHandlerMiddleware);
