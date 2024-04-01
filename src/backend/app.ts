import express from "express";
import bodyParser from "body-parser";

import {
    userController,
    productController,
    orderController,
} from "./routes/client";
import {
    crmUserController,
    manufacturerController,
    tagController,
    purposeController,
} from "./routes/crm";

import { errorHandlerMiddleware, routeHandlerMiddleware } from "./middlewares";
import { notFound } from "./not-found";

export const app = express();

app.use(bodyParser.json());

// Client
app.use("/api/auth", userController);
app.use("/api/products", productController);
app.use("/api/orders", orderController);

// CRM
app.use("/crm/auth", crmUserController);
app.use("/crm/manufacturers", manufacturerController);
app.use("/crm/tags", tagController);
app.use("/crm/purpose", purposeController);

app.use("*", routeHandlerMiddleware(notFound));

app.use(errorHandlerMiddleware);
