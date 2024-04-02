import { Queue, Worker } from "bullmq";

import { Order, OrderStatus } from "../../../database/models";

import { config } from "../../../config";

type JobData = {
    orderId: number;
    nextStatus: OrderStatus;
};

type JobResult = {
    status: "success" | "failed";
    message: string;
};

const queueName = "orderQueue";

export const orderQueue = new Queue<JobData, JobResult>(queueName, {
    connection: {
        host: config.redis.host,
        port: parseInt(config.redis.port),
    },
});

export const orderWorker = new Worker<JobData, JobResult>(
    queueName,
    async (job) => {
        try {
            const order = await Order.findByPk(job.data.orderId);

            if (!order) {
                return {
                    status: "failed",
                    message: "Order not found",
                };
            }

            await order.update({ status: job.data.nextStatus });

            return {
                status: "success",
                message: "Order status successfully changed",
            };
        } catch (e) {
            return {
                status: "failed",
                message:
                    e instanceof Error
                        ? e.message
                        : "Unknown error while working with the database",
            };
        }
    },
    {
        connection: {
            host: config.redis.host,
            port: parseInt(config.redis.port),
        },
        autorun: false,
    }
);
