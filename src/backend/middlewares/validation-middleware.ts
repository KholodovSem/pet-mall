import type { Handler } from "express";
import { validationResult } from "express-validator";

import { ValidationError } from "../utils";

export const validationMiddleware: Handler = (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw new ValidationError(errors.array().map((error) => error.msg));
        }
    } catch (error) {
        next(error);
    }
};
