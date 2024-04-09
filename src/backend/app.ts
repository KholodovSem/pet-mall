import express from "express";
import bodyParser from "body-parser";

import {
    userController,
    productController,
    clientOrderController,
} from "./routes/client";
import {
    crmUserController,
    manufacturerController,
    tagController,
    purposeController,
    crmOrderController,
    crmProductsController,
} from "./routes/crm";

import { errorHandlerMiddleware, routeHandlerMiddleware } from "./middlewares";
import { notFound } from "./not-found";

export const app = express();

app.use(bodyParser.json());

// Client
app.use("/api/auth", userController);
app.use("/api/products", productController);
app.use("/api/orders", clientOrderController);

// CRM
app.use("/crm/auth", crmUserController);
app.use("/crm/manufacturers", manufacturerController);
app.use("/crm/tags", tagController);
app.use("/crm/purposes", purposeController);
app.use("/crm/orders", crmOrderController);
app.use("/crm/products", crmProductsController);

app.use("*", routeHandlerMiddleware(notFound));

app.use(errorHandlerMiddleware);
