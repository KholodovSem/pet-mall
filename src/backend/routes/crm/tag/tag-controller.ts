import { Router } from "express";
import { checkSchema, query } from "express-validator";

import { getTags, createTag, updateTag, deleteTag } from "./routes";

import { PossibleRole } from "../../../../database/models";

import {
    routeHandlerMiddleware,
    permissionMiddleware,
    authMiddleware,
    validationMiddleware,
} from "../../../middlewares";

export const tagController = Router();

const tagSchema = checkSchema({
    name: {
        notEmpty: {
            errorMessage: "Tag name is required",
        },
        isString: {
            errorMessage: "Tag name must be a string",
        },
    },
});

tagController.get(
    "/",
    authMiddleware,
    permissionMiddleware(PossibleRole.MANAGER),
    routeHandlerMiddleware(getTags)
);
tagController.post(
    "/",
    authMiddleware,
    permissionMiddleware(PossibleRole.MANAGER),
    tagSchema,
    validationMiddleware,
    routeHandlerMiddleware(createTag)
);
tagController.put(
    "/:id",
    authMiddleware,
    permissionMiddleware(PossibleRole.MANAGER),
    tagSchema,
    validationMiddleware,
    routeHandlerMiddleware(updateTag)
);
tagController.delete(
    "/:id",
    authMiddleware,
    permissionMiddleware(),
    validationMiddleware,
    routeHandlerMiddleware(deleteTag)
);
