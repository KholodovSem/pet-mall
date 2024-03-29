import { Router } from "express";

import { routeHandlerMiddleware } from "../../../middlewares";

import { getProducts } from "./routes";

export const productController = Router();

productController.get("/", routeHandlerMiddleware(getProducts));
