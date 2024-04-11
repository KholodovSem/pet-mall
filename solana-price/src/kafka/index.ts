import { Kafka } from "kafkajs";

import { config } from "../config";

const broker_url = `${config.kafka.host}:${config.kafka.port}`;

export const kafka = new Kafka({
    clientId: "solana-price-producer",
    brokers: [broker_url],
});

export const producer = kafka.producer();
