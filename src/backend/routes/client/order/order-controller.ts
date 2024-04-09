import { Router } from "express";
import { checkSchema, query } from "express-validator";

import {
    authMiddleware,
    routeHandlerMiddleware,
    validationMiddleware,
} from "../../../middlewares";

import { createOrder, getOrders, declineOrder } from "./routes";

export const clientOrderController = Router();

const createOrderSchema = checkSchema({
    products: {
        errorMessage: "Products field must be provided as array",
        isArray: {
            errorMessage: "Provide at least one product",
            bail: true,
            options: {
                min: 1,
            },
        },
        custom: {
            options: (products) => {
                for (const product of products) {
                    if (!product.productId || !product.quantity) {
                        throw new Error("Product id and quantity is required");
                    }

                    if (
                        typeof product.productId !== "number" ||
                        typeof product.quantity !== "number"
                    ) {
                        throw new Error(
                            "Product id and quantity must be a number"
                        );
                    }
                }

                return true;
            },
        },
    },
});

clientOrderController.get(
    "/",
    authMiddleware,
    routeHandlerMiddleware(getOrders)
);
clientOrderController.post(
    "/",
    authMiddleware,
    createOrderSchema,
    validationMiddleware,
    routeHandlerMiddleware(createOrder)
);
clientOrderController.post(
    "/decline/:id",
    authMiddleware,
    validationMiddleware,
    routeHandlerMiddleware(declineOrder)
);
