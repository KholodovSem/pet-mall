import { Queue } from "bullmq";

enum Queues {
    ORDER_QUEUE = "orderQueue",
}

export const orderQueue = new Queue(Queues.ORDER_QUEUE);
