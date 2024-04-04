import { Router } from "express";
import { checkSchema, query } from "express-validator";

import {
    authMiddleware,
    routeHandlerMiddleware,
    validationMiddleware,
} from "../../../middlewares";

import { createOrder, getOrders, declineOrder } from "./routes";

export const orderController = Router();

/* 
    Body example: 
    {
        productId: number;
        quantity: number;
    }
*/

const createOrderSchema = checkSchema({
    productId: {
        isNumeric: {
            errorMessage: "Product id must be a number",
        },
        exists: {
            errorMessage: "Product id is required",
        },
    },
    amount: {
        isLength: {
            errorMessage: "It should be at least 1",
            options: {
                min: 1,
            },
        },
        isNumeric: {
            errorMessage: "Amount must be a number",
        },
        exists: {
            errorMessage: "Amount is required",
        },
    },
});

const orderChecker = query("id", "Order id must be provided in query params");

orderController.get("/", authMiddleware, routeHandlerMiddleware(getOrders));
orderController.post(
    "/",
    authMiddleware,
    createOrderSchema,
    validationMiddleware,
    routeHandlerMiddleware(createOrder)
);
orderController.post(
    "/decline/:id",
    authMiddleware,
    orderChecker,
    validationMiddleware,
    routeHandlerMiddleware(declineOrder)
);
