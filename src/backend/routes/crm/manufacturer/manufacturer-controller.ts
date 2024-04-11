import { Router } from "express";
import { checkSchema } from "express-validator";

import {
    createManufacturer,
    deleteManufacturer,
    updateManufacturer,
    getManufacturers,
} from "./routes";

import {
    routeHandlerMiddleware,
    permissionMiddleware,
    authMiddleware,
    validationMiddleware,
} from "../../../middlewares";

import { PossibleRole } from "../../../../common";

export const manufacturerController = Router();

const manufacturerSchema = checkSchema({
    name: {
        notEmpty: {
            errorMessage: "Manufacturer name is required",
        },
        isString: {
            errorMessage: "Manufacturer name must be a string",
        },
    },
});

manufacturerController.get(
    "/",
    authMiddleware,
    permissionMiddleware(PossibleRole.MANAGER),
    routeHandlerMiddleware(getManufacturers)
);
manufacturerController.post(
    "/",
    authMiddleware,
    permissionMiddleware(PossibleRole.MANAGER),
    manufacturerSchema,
    validationMiddleware,
    routeHandlerMiddleware(createManufacturer)
);
manufacturerController.put(
    "/:id",
    authMiddleware,
    permissionMiddleware(PossibleRole.MANAGER),
    manufacturerSchema,
    validationMiddleware,
    routeHandlerMiddleware(updateManufacturer)
);
manufacturerController.delete(
    "/:id",
    authMiddleware,
    permissionMiddleware(),
    validationMiddleware,
    routeHandlerMiddleware(deleteManufacturer)
);
