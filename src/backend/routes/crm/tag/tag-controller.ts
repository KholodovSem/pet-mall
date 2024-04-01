import { Router } from "express";
import { checkSchema, query } from "express-validator";

import { getTags, createTag, updateTag, deleteTag } from "./routes";

import { PossibleRole } from "../../../../database/models";

import {
    routeHandlerMiddleware,
    permissionMiddleware,
    authMiddleware,
} from "../../../middlewares";

export const tagController = Router();

const tagBodyChecker = checkSchema({
    name: {
        notEmpty: {
            errorMessage: "Tag name is required",
        },
        isString: {
            errorMessage: "Tag name must be a string",
        },
    },
});

const tagIdChecker = query("id", "You must provide company id");

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
    tagBodyChecker,
    routeHandlerMiddleware(createTag)
);
tagController.put(
    "/:id",
    authMiddleware,
    permissionMiddleware(PossibleRole.ADMIN, PossibleRole.MANAGER),
    tagBodyChecker,
    tagIdChecker,
    routeHandlerMiddleware(updateTag)
);
tagController.delete(
    "/:id",
    authMiddleware,
    permissionMiddleware(PossibleRole.ADMIN),
    tagIdChecker,
    routeHandlerMiddleware(deleteTag)
);
