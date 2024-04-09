import { Handler } from "express";
import { Op } from "sequelize";

import { Order, OrderStatus } from "../../../../../database/models";
import { BadRequestError, NotFoundError } from "../../../../utils";

export const updateOrderStatus: Handler = async (req, res) => {
    const params = req.params as Record<string, string | undefined>;
    const id = parseInt(params.id || "");

    const { status } = req.body as {
        status: OrderStatus;
    };

    const order = await Order.findOne({
        where: {
            id: {
                [Op.eq]: id,
            },
        },
    });

    if (!order) {
        throw new NotFoundError(`Order with id:${id} not found`);
    }

    const isSameStatus = order.status === status;

    if (isSameStatus) {
        throw new BadRequestError(`Order already has ${status} status`);
    }

    await order.update({ status });
    await order.save();

    return res.json(order);
};
