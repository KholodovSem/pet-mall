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
import { serverAdapter } from "./redis/scheduler";

export const app = express();

app.use(bodyParser.json());

// Test queue

app.use("/api/queue-test", async (req, res) => {
    const item = { name: "Task" };
});

// Client
app.use("/api/auth", userController);
app.use("/api/products", productController);
app.use("/api/orders", orderController);

// CRM
app.use("/crm/auth", crmUserController);
app.use("/crm/manufacturers", manufacturerController);
app.use("/crm/tags", tagController);
app.use("/crm/purpose", purposeController);

//Scheduler
app.use("/admin/queues", serverAdapter.getRouter());

app.use("*", routeHandlerMiddleware(notFound));

app.use(errorHandlerMiddleware);
