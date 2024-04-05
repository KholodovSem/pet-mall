import { Router } from "express";
import { checkSchema, query } from "express-validator";

import {
    getPurposes,
    createPurpose,
    updatePurpose,
    deletePurpose,
} from "./routes";

import { PossibleRole } from "../../../../database/models";

import {
    routeHandlerMiddleware,
    permissionMiddleware,
    authMiddleware,
    validationMiddleware,
} from "../../../middlewares";

export const purposeController = Router();

const purposeSchema = checkSchema({
    name: {
        notEmpty: {
            errorMessage: "Purpose name is required",
        },
        isString: {
            errorMessage: "Purpose name must be a string",
        },
    },
});

const purposeParams = query("id", "You must provide company id");

purposeController.get(
    "/",
    authMiddleware,
    permissionMiddleware(PossibleRole.MANAGER),
    routeHandlerMiddleware(getPurposes)
);
purposeController.post(
    "/",
    authMiddleware,
    permissionMiddleware(PossibleRole.MANAGER),
    purposeSchema,
    validationMiddleware,
    routeHandlerMiddleware(createPurpose)
);
purposeController.put(
    "/:id",
    authMiddleware,
    permissionMiddleware(PossibleRole.MANAGER),
    purposeSchema,
    purposeParams,
    validationMiddleware,
    routeHandlerMiddleware(updatePurpose)
);
purposeController.delete(
    "/:id",
    authMiddleware,
    permissionMiddleware(),
    purposeParams,
    validationMiddleware,
    routeHandlerMiddleware(deletePurpose)
);
