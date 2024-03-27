import { Router } from "express";

import { routeHandlerMiddleware } from "../middlewares";

import { getProducts } from './routes';
import { Product, Tag } from "../../database/models";
import { PetType } from "../../database/models/Product";

export const router = Router();

// routeHandlerMiddleware(getProducts)

router.get("/", async (req, res) => {

    await Product.create({ company: 'Test', petType: 'cats', });

    const result = await Product.findAll({ include: Tag })

    res.send(result);
});
// router.post("/login", bodyMiddleware, routeHandlerMiddleware(loginUser));
