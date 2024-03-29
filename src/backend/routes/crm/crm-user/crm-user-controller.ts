import { Router } from "express";

import { register, login } from "./routes";

import { routeHandlerMiddleware } from "../../../middlewares";
import { credentialBodyChecker } from "../../../utils";

export const crmUserController = Router();

crmUserController.post("/register", credentialBodyChecker, routeHandlerMiddleware(register));
crmUserController.post("/login", credentialBodyChecker, routeHandlerMiddleware(login));
