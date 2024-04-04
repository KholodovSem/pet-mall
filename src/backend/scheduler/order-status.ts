import cron from "node-cron";
import { Op } from "sequelize";

import { Order, OrderStatus } from "../../database/models";

import { container } from "../ioc/inversify.config";
import { NotificationService } from "../socket/services";

const notificationService =
    container.get<NotificationService>(NotificationService);

const handleChangeOrderStatus = (
    currentOrderStatus: OrderStatus
): OrderStatus => {
    switch (currentOrderStatus) {
        case OrderStatus.PENDING: {
            return OrderStatus.PROCESSING;
        }

        case OrderStatus.PROCESSING: {
            return OrderStatus.APPROVE;
        }

        case OrderStatus.APPROVE: {
            return OrderStatus.DELIVERY;
        }

        case OrderStatus.DELIVERY: {
            return OrderStatus.DONE;
        }

        default: {
            throw new Error("Incorrect order status");
        }
    }
};

export const changeOrderTask = cron.schedule(
    "0 * * * *",
    async () => {
        const orders = await Order.findAll({
            where: {
                status: {
                    [Op.ne]: OrderStatus.DONE,
                },
            },
        });

        for (const order of orders) {
            const nextStatus = handleChangeOrderStatus(order.status);

            const oldStatus = order.status;

            await order.update({ status: nextStatus });

            const message = `Order changed status from ${oldStatus} to ${nextStatus}`;

            notificationService.notify(order.userId, message);
        }
    },
    { scheduled: false }
);
