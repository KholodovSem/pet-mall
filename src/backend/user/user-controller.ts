import { Router } from "express";
import { checkSchema } from "express-validator";

import { routeHandlerMiddleware } from "../middlewares";

import { loginUser, registerUser } from "./routes";

export const router = Router();

const bodyMiddleware = checkSchema({
    email: {
        isEmail: {
            errorMessage: "Must be a valid e-mail address",
        },
        notEmpty: true,
    },
    password: {
        notEmpty: {
            errorMessage: "Password is required",
        },
        isLength: {
            errorMessage: "Password must have as minimum 6 characters",
            options: {
                min: 6,
            },
        },
    },
});

router.post("/register", bodyMiddleware, routeHandlerMiddleware(registerUser));
router.post("/login", bodyMiddleware, routeHandlerMiddleware(loginUser));
