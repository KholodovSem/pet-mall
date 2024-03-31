import { NextFunction, Request, Response } from "express";

import {
    BadRequestError,
    ForbiddenError,
    InternalError,
    NotFoundError,
    UnauthorizedError,
    ValidationError,
} from "../utils";

export const errorHandlerMiddleware = (err: unknown, request: Request, res: Response, next: NextFunction) => {
    console.log("Error", err);
    if (err instanceof ValidationError) {
        console.log("Validation");

        return res.status(400).json({ name: err.name, message: err.message, errors: err.errors });
    }

    if (err instanceof BadRequestError) {
        return res.status(400).json({ name: err.name, message: err.message });
    }

    if (err instanceof UnauthorizedError) {
        return res.status(401).json({ name: err.name, message: err.message });
    }

    if (err instanceof ForbiddenError) {
        return res.status(403).json({ name: err.name, message: err.message });
    }

    if (err instanceof NotFoundError) {
        return res.status(404).json({ name: err.name, message: err.message });
    }

    res.status(500).end();
};
