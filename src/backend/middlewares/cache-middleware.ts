import { type Handler } from "express";
import { sha1 } from "object-hash";

import { redis } from "../../redis";

export const cacheMiddleware: Handler = async (req, res, next) => {
    try {
        const cachedResponse = await redis.get(
            //TODO: Move to separate fn (key creating)
            `${req.path}@${sha1(req.query)}`
        );

        if (cachedResponse) {
            console.log("From cache!");
            return res.json(cachedResponse);
        }

        console.log("No cache :(");
        next();
    } catch (error) {
        next(error);
    }
};
