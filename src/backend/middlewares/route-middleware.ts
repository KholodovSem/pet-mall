import { Request, Response, Handler, NextFunction } from "express";

export const routeHandlerMiddleware = (fn: Handler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};
