import { Redis } from "ioredis";
import { config } from "../config";

export enum RedisKeys {
    SOLANA_PRICE = "solana_price",
}

export const TTL = 10;

export const redis = new Redis({
    host: config.redis.host,
    port: config.redis.port,
    lazyConnect: true,
});
