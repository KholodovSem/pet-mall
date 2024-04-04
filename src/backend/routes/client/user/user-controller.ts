import { Router } from "express";

import {
    routeHandlerMiddleware,
    validationMiddleware,
} from "../../../middlewares";

import { loginUser, registerUser } from "./routes";

import { credentialSchema } from "../../../utils";

export const userController = Router();

userController.post(
    "/register",
    credentialSchema,
    validationMiddleware,
    routeHandlerMiddleware(registerUser)
);
userController.post(
    "/login",
    credentialSchema,
    validationMiddleware,
    routeHandlerMiddleware(loginUser)
);
