import { Kafka } from "kafkajs";

import { config } from "../config";

export enum KafkaTopics {
    SOLANA_PRICE = "solana_price",
}

const broker_url = `${config.kafka.host}:${config.kafka.port}`;

export const kafka = new Kafka({
    clientId: "solana-price-consumer",
    brokers: [broker_url],
});

export const consumer = kafka.consumer({ groupId: "main-backend" });
