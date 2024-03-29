import { type Handler } from "express";
import { validationResult } from "express-validator";
import { Op } from "sequelize";

import { User, OrderProduct, Order, OrderStatus, Product } from "../../../../../database/models";
import { NotFoundError, ValidationError } from "../../../../utils";

export const createOrder: Handler = async (req, res) => {
    const validationErrors = validationResult(req);

    if (validationErrors) {
        throw new ValidationError(validationErrors.array().map((error) => error.msg));
    }

    const products = req.body.products as { productId: number; quantity: number }[];

    const user = await User.findOne({
        where: {
            id: req.userId,
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

    const productsErrors: string[] = [];

    for (const product of products) {
        const databaseProduct = databaseProducts.find((databaseProduct) => databaseProduct.id === product.productId);

        if (!databaseProduct) {
            productsErrors.push(`Product with id:${product.productId} doesn't exist`);
            continue;
        }

        const isEnough = product.quantity <= databaseProduct.quantity;

        if (!isEnough) {
            productsErrors.push(`Product with id:${product.productId} is not available in the right quantity`);
        }
    }

    if (!productsErrors.length) {
        throw new ValidationError(productsErrors);
    }

    const order = await Order.create({ status: OrderStatus.PENDING, userId: user.id });

    await OrderProduct.bulkCreate(
        databaseProducts.map((product) => ({
            productId: product.id,
            orderId: order.id,
        }))
    );

    return res.json(order);
};

/ Variant to handle possible errors with products /;

// const productsMap = databaseProducts.reduce((acc, product) => {

//     acc[product.id] = product;

//     return acc;

// }, {} as Record<number, Product>);

// const errors = products.reduce((acc, product) => {
//     const isProductExist = productsMap[product.productId];
//     const isEnough = product.quantity <= productsMap[product.productId]?.quantity;

//     if (!isProductExist) {
//         acc.push(`Product with id:${product.productId} doesn't exist`);
//     }

//     if (!isEnough) {
//         acc.push(`Product with id:${product.productId} is not available in the right quantity`);
//     }

//     return acc;
// }, [] as string[]);
