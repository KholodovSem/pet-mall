import { Router } from "express";

import { register, login } from "./routes";

import {
    routeHandlerMiddleware,
    permissionMiddleware,
    validationMiddleware,
    authMiddleware,
} from "../../../middlewares";
import { credentialSchema } from "../../../utils";

export const crmUserController = Router();

crmUserController.post(
    "/register",
    credentialSchema,
    validationMiddleware,
    authMiddleware,
    permissionMiddleware(),
    routeHandlerMiddleware(register)
);
crmUserController.post(
    "/login",
    credentialSchema,
    validationMiddleware,
    routeHandlerMiddleware(login)
);
