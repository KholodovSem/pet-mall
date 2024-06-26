import { Router } from "express";
import { checkSchema, query } from "express-validator";

import {
    getPurposes,
    createPurpose,
    updatePurpose,
    deletePurpose,
} from "./routes";

import {
    routeHandlerMiddleware,
    permissionMiddleware,
    authMiddleware,
    validationMiddleware,
} from "../../../middlewares";

import { PossibleRole } from "../../../../common/constants";

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
    validationMiddleware,
    routeHandlerMiddleware(updatePurpose)
);
purposeController.delete(
    "/:id",
    authMiddleware,
    permissionMiddleware(),
    validationMiddleware,
    routeHandlerMiddleware(deletePurpose)
);
