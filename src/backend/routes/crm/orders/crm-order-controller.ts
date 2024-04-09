import { Router } from "express";
import { checkSchema } from "express-validator";

import { getOrders, updateOrderStatus } from "./routes";
import {
    authMiddleware,
    permissionMiddleware,
    validationMiddleware,
    routeHandlerMiddleware,
} from "../../../middlewares";
import { OrderStatus, PossibleRole } from "../../../../database/models";

export const crmOrderController = Router();

const updateOrderSchema = checkSchema({
    status: {
        exists: {
            errorMessage: "Provide new order status",
        },
        isIn: {
            options: Object.values(OrderStatus),
        },
    },
});

crmOrderController.get(
    "/",
    authMiddleware,
    permissionMiddleware(PossibleRole.MANAGER),
    routeHandlerMiddleware(getOrders)
);
crmOrderController.put(
    "/:id",
    authMiddleware,
    permissionMiddleware(PossibleRole.MANAGER),
    updateOrderSchema,
    validationMiddleware,
    routeHandlerMiddleware(updateOrderStatus)
);
