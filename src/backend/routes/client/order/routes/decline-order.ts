import { Handler } from "express";
import { Op } from "sequelize";

import { Order, OrderStatus, Product } from "../../../../../database/models";

import { BadRequestError, NotFoundError } from "../../../../utils";

export const declineOrder: Handler = async (req, res) => {
    const params = req.params;

    const orderId = parseInt(params.id || "");

    const order = await Order.findOne({
        where: {
            id: {
                [Op.eq]: orderId,
            },
        },
        include: {
            model: Product,
        },
    });

    if (!order) {
        throw new NotFoundError(`Order with id:${orderId} not found`);
    }

    const isOrderAlreadyDeclined = order.status === OrderStatus.DECLINED;

    if (isOrderAlreadyDeclined) {
        throw new BadRequestError("The order has already been declined");
    }

    const isOrderCanBeDeclined = order.status === OrderStatus.PENDING;

    if (!isOrderCanBeDeclined) {
        throw new BadRequestError("Order status can no longer be changed");
    }

    await order.update({ status: OrderStatus.DECLINED });
    await order.save();

    if (!order.products) {
        return;
    }

    //TODO: Is this the right approach to solve this problem?
    const updatedProducts = order.products?.map((product) => {
        return Product.update(
            { quantity: product.quantity + 1 },
            {
                where: {
                    id: {
                        [Op.eq]: product.id,
                    },
                },
            }
        );
    });

    await Promise.all(updatedProducts);

    return res.json(order);
};
