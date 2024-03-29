import { Router } from "express";
import { checkSchema, query } from "express-validator";

import { authMiddleware, routeHandlerMiddleware } from "../middlewares";

import { createOrder, getOrders, declineOrder } from "./routes";

export const router = Router();

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
                //TODO: Max?
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

const orderChecker = query('orderId', 'Order id must be provided in query params')

router.get("/", authMiddleware, routeHandlerMiddleware(getOrders));
router.post("/", authMiddleware, createOrderSchema, routeHandlerMiddleware(createOrder));
router.post("/decline/:id", authMiddleware, orderChecker, routeHandlerMiddleware(declineOrder));
