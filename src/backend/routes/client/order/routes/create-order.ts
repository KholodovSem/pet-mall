import { type Handler } from "express";
import { Op } from "sequelize";

import {
    User,
    OrderProduct,
    Order,
    OrderStatus,
    Product,
} from "../../../../../database/models";

import { NotFoundError, ValidationError } from "../../../../utils";

export const createOrder: Handler = async (req, res) => {
    const products = req.body.products as {
        productId: number;
        quantity: number;
    }[];

    const user = await User.findOne({
        where: {
            id: req.user?.id,
        },
    });

    if (!user) {
        throw new NotFoundError("User not found");
    }

    const databaseProducts = await Product.findAll({
        where: {
            id: {
                [Op.in]: products.map((product) => product.productId),
            },
        },
    });

    const databaseProductsMap = databaseProducts.reduce(
        (acc, product) => {
            acc[product.id] = product;

            return acc;
        },
        {} as Record<number, Product>
    );

    const productsErrors: string[] = [];

    for (const product of products) {
        const isProductExist = databaseProductsMap[product.productId];

        if (!isProductExist) {
            productsErrors.push(
                `Product with id:${product.productId} doesn't exist`
            );
            continue;
        }

        const isEnough =
            product.quantity <=
            databaseProductsMap[product.productId]?.quantity;

        if (!isEnough) {
            productsErrors.push(
                `Product with id:${product.productId} is not available in the right quantity`
            );
        }
    }

    if (productsErrors.length) {
        throw new ValidationError(productsErrors);
    }

    const order = await Order.create({
        status: OrderStatus.PENDING,
        user_id: user.id,
    });

    await OrderProduct.bulkCreate(
        databaseProducts.map((product) => ({
            product_id: product.id,
            order_id: order.id,
        }))
    );

    const updatedProducts = products.map((product) => {
        const quantity =
            databaseProductsMap[product.productId].quantity - product.quantity;

        return Product.update(
            { quantity },
            {
                where: {
                    id: {
                        [Op.eq]: product.productId,
                    },
                },
            }
        );
    });

    await Promise.all(updatedProducts);

    return res.json(order);
};
