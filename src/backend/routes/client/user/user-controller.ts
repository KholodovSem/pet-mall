import { Router } from "express";
import { checkSchema } from "express-validator";

import { routeHandlerMiddleware } from "../../../middlewares";

import { loginUser, registerUser } from "./routes";

import { credentialsChecker } from "../../../utils";

export const userController = Router();

userController.post(
    "/register",
    credentialsChecker,
    routeHandlerMiddleware(registerUser)
);
userController.post(
    "/login",
    credentialsChecker,
    routeHandlerMiddleware(loginUser)
);
