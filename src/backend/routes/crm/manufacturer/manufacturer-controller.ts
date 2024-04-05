import { Router } from "express";
import { checkSchema, query } from "express-validator";

import {
    createManufacturer,
    deleteManufacturer,
    updateManufacturer,
    getManufacturers,
} from "./routes";

import { PossibleRole } from "../../../../database/models";

import {
    routeHandlerMiddleware,
    permissionMiddleware,
    authMiddleware,
    validationMiddleware,
} from "../../../middlewares";

export const manufacturerController = Router();

const manufacturerSchema = checkSchema({
    name: {
        notEmpty: {
            errorMessage: "Company name is required",
        },
        isString: {
            errorMessage: "Company name must be a string",
        },
    },
});

const manufacturerParams = query("id", "You must provide company id");

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
    manufacturerParams,
    validationMiddleware,
    routeHandlerMiddleware(updateManufacturer)
);
manufacturerController.delete(
    "/:id",
    authMiddleware,
    permissionMiddleware(),
    manufacturerParams,
    validationMiddleware,
    routeHandlerMiddleware(deleteManufacturer)
);
