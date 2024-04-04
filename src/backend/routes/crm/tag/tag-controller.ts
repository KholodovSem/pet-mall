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

const tagParams = query("id", "You must provide company id");

tagController.get(
    "/",
    authMiddleware,
    permissionMiddleware(PossibleRole.ADMIN, PossibleRole.MANAGER),
    routeHandlerMiddleware(getTags)
);
tagController.post(
    "/",
    authMiddleware,
    permissionMiddleware(PossibleRole.ADMIN, PossibleRole.MANAGER),
    tagSchema,
    validationMiddleware,
    routeHandlerMiddleware(createTag)
);
tagController.put(
    "/:id",
    authMiddleware,
    permissionMiddleware(PossibleRole.ADMIN, PossibleRole.MANAGER),
    tagSchema,
    tagParams,
    validationMiddleware,
    routeHandlerMiddleware(updateTag)
);
tagController.delete(
    "/:id",
    authMiddleware,
    permissionMiddleware(PossibleRole.ADMIN),
    tagParams,
    validationMiddleware,
    routeHandlerMiddleware(deleteTag)
);
