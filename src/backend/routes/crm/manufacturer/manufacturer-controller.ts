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
} from "../../../middlewares";

export const manufacturerController = Router();

const manufacturerChecker = checkSchema({
    name: {
        notEmpty: {
            errorMessage: "Company name is required",
        },
        isString: {
            errorMessage: "Company name must be a string",
        },
    },
});

const manufacturerIdChecker = query("id", "You must provide company id");

manufacturerController.get(
    "/",
    authMiddleware,
    permissionMiddleware(PossibleRole.ADMIN, PossibleRole.MANAGER),
    routeHandlerMiddleware(getManufacturers)
);
manufacturerController.post(
    "/",
    authMiddleware,
    permissionMiddleware(PossibleRole.ADMIN, PossibleRole.MANAGER),
    manufacturerChecker,
    routeHandlerMiddleware(createManufacturer)
);
manufacturerController.put(
    "/:id",
    authMiddleware,
    permissionMiddleware(PossibleRole.ADMIN, PossibleRole.MANAGER),
    manufacturerChecker,
    manufacturerIdChecker,
    routeHandlerMiddleware(updateManufacturer)
);
manufacturerController.delete(
    "/:id",
    authMiddleware,
    permissionMiddleware(PossibleRole.ADMIN),
    manufacturerIdChecker,
    routeHandlerMiddleware(deleteManufacturer)
);
