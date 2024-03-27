import { Request, Response } from 'express';

import { BadRequestError, ForbiddenError, NotFoundError, UnauthorizedError, ValidationError } from "../utils";

export const errorHandlerMiddleware = () => {
  console.log('Inside error middleware:');

  return (err: unknown, _: Request, res: Response) => {

    if (err instanceof ValidationError) {
      return res
        .status(400)
        .json({ name: err.name, message: err.message, errors: err.errors });
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
};
