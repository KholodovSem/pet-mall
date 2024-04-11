import { type Handler } from "express";

import { redis } from "../../redis";
import { requestToKey } from "../utils";

export const cacheMiddleware: Handler = async (req, res, next) => {
    try {
        const requestKey = requestToKey(req);
        const cachedResponse = await redis.get(requestKey);

        if (cachedResponse) {
            return res.json(cachedResponse);
        }

        next();
    } catch (error) {
        next(error);
    }
};
