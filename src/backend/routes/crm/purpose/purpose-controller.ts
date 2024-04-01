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
} from "../../../middlewares";

export const purposeController = Router();

const purposeChecker = checkSchema({
    name: {
        notEmpty: {
            errorMessage: "Purpose name is required",
        },
        isString: {
            errorMessage: "Purpose name must be a string",
        },
    },
});

const purposeIdChecker = query("id", "You must provide company id");

purposeController.get(
    "/",
    authMiddleware,
    permissionMiddleware(PossibleRole.ADMIN, PossibleRole.MANAGER),
    routeHandlerMiddleware(getPurposes)
);
purposeController.post(
    "/",
    authMiddleware,
    permissionMiddleware(PossibleRole.ADMIN, PossibleRole.MANAGER),
    purposeChecker,
    routeHandlerMiddleware(createPurpose)
);
purposeController.put(
    "/:id",
    authMiddleware,
    permissionMiddleware(PossibleRole.ADMIN, PossibleRole.MANAGER),
    purposeChecker,
    purposeIdChecker,
    routeHandlerMiddleware(updatePurpose)
);
purposeController.delete(
    "/:id",
    authMiddleware,
    permissionMiddleware(PossibleRole.ADMIN),
    purposeIdChecker,
    routeHandlerMiddleware(deletePurpose)
);
