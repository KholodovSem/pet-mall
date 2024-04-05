import { type Handler } from "express";
import { Op } from "sequelize";

import { Order } from "../../../../../database/models";

export const getOrders: Handler = async (req, res) => {
    const orders = await Order.findAll({
        where: {
            [Op.and]: {
                user_id: {
                    [Op.eq]: req.userId,
                },
            },
        },
    });

    return res.json(orders);
};
