import { Router } from "express";

import { register, login } from "./routes";

import { PossibleRole } from "../../../../database/models";

import {
    routeHandlerMiddleware,
    permissionMiddleware,
    validationMiddleware,
} from "../../../middlewares";
import { credentialSchema } from "../../../utils";

export const crmUserController = Router();

crmUserController.post(
    "/register",
    credentialSchema,
    validationMiddleware,
    permissionMiddleware(PossibleRole.ADMIN),
    routeHandlerMiddleware(register)
);
crmUserController.post(
    "/login",
    credentialSchema,
    validationMiddleware,
    routeHandlerMiddleware(login)
);
