import { Router } from "express";
import { checkSchema } from "express-validator";

import { routeHandlerMiddleware } from "../../../middlewares";

import { loginUser, registerUser } from "./routes";

import { credentialBodyChecker } from "../../../utils";

export const userController = Router();

userController.post("/register", credentialBodyChecker, routeHandlerMiddleware(registerUser));
userController.post("/login", credentialBodyChecker, routeHandlerMiddleware(loginUser));
