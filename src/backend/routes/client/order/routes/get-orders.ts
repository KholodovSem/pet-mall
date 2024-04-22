import { type Handler } from "express";
import { Op } from "sequelize";

import { Order, Product } from "../../../../../database/models";

export const getOrders: Handler = async (req, res) => {
    const orders = await Order.findAll({
        include: {
            model: Product,
        },
        where: {
            user_id: {
                [Op.eq]: req.user?.id,
            },
        },
    });

    return res.json(orders);
};
