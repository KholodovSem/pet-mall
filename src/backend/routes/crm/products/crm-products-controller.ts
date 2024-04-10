import { Router } from "express";
import { checkSchema } from "express-validator";

import { createProduct, updateProduct } from "./routes";
import {
    authMiddleware,
    permissionMiddleware,
    routeHandlerMiddleware,
    uploadMiddleware,
    validationMiddleware,
} from "../../../middlewares";
import { PossibleRole } from "../../../../database/models";

export const crmProductsController = Router();

const productSchema = checkSchema({
    name: {
        notEmpty: true,
        isString: {
            errorMessage: "Product name must be a string",
        },
    },
    price: {
        isFloat: {
            errorMessage: "Price must be a number",
            options: {
                min: 1,
            },
        },
    },
    quantity: {
        isInt: {
            errorMessage:
                "Quantity must be a number and at least greater then one",
            options: {
                min: 1,
            },
        },
    },
    tags: {
        optional: true,
        isArray: {
            errorMessage: "Tags must be an array",
        },
    },
    manufacturer_id: {
        exists: {
            errorMessage: "Provide manufacturer id",
        },
        isInt: {
            errorMessage: "Manufacturer id must be a number",
        },
    },
    purpose_id: {
        exists: {
            errorMessage: "Provide purpose id",
        },
        isInt: {
            errorMessage: "Purpose id must be a number",
        },
    },
});

//! Pay attention: the body comes to us in the form-data
//* Specify it in the postman

crmProductsController.post(
    "/",
    authMiddleware,
    permissionMiddleware(PossibleRole.MANAGER),
    uploadMiddleware,
    productSchema,
    validationMiddleware,
    routeHandlerMiddleware(createProduct)
);

crmProductsController.put(
    "/:id",
    authMiddleware,
    permissionMiddleware(PossibleRole.MANAGER),
    uploadMiddleware,
    productSchema,
    validationMiddleware,
    routeHandlerMiddleware(updateProduct)
);
