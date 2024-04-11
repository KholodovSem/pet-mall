import { consumer, KafkaTopics } from "../";

import { redis, RedisKeys } from "../../redis";

export const handleSolanaPrice = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: KafkaTopics.SOLANA_PRICE });
    await consumer.run({
        eachMessage: async ({ message }) => {
            const solanaLastPrice = message.value?.toString();

            if (solanaLastPrice) {
                redis.set(RedisKeys.SOLANA_PRICE, solanaLastPrice);
            }
        },
    });
};
