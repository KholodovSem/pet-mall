import { Router } from "express";

import { routeHandlerMiddleware } from "../middlewares";

import { getProducts } from "./routes";

export const router = Router();

router.get("/", routeHandlerMiddleware(getProducts));
