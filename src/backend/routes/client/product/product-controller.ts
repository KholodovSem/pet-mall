import { Router } from "express";

import { routeHandlerMiddleware, cacheMiddleware } from "../../../middlewares";

import { getProducts } from "./routes";

export const productController = Router();

productController.get(
    "/",
    cacheMiddleware,
    routeHandlerMiddleware(getProducts)
);
