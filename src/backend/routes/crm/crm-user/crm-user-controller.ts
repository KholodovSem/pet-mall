import { Router } from "express";

import { register, login } from "./routes";

import { PossibleRole } from "../../../../database/models";

import {
    routeHandlerMiddleware,
    permissionMiddleware,
} from "../../../middlewares";
import { credentialsChecker } from "../../../utils";

export const crmUserController = Router();

crmUserController.post(
    "/register",
    credentialsChecker,
    permissionMiddleware(PossibleRole.ADMIN),
    routeHandlerMiddleware(register)
);
crmUserController.post(
    "/login",
    credentialsChecker,
    routeHandlerMiddleware(login)
);
