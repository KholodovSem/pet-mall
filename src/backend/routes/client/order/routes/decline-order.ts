import { Handler } from "express";
import { Op } from "sequelize";

import { Order, OrderStatus } from "../../../../../database/models";

import { NotFoundError } from "../../../../utils";

export const declineOrder: Handler = async (req, res) => {
    const params = req.params;

    const orderId = parseInt(params.id || "");

    const order = await Order.findOne({
        where: {
            id: {
                [Op.eq]: orderId,
            },
        },
    });

    if (!order) {
        throw new NotFoundError(`Order with id:${orderId} not found`);
    }

    await order.update({ status: OrderStatus.DECLINED });
    await order.save();

    return res.json(order);
};
