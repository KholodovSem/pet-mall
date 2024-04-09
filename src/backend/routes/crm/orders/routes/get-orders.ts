import { Handler } from "express";

import { Order } from "../../../../../database/models";

export const getOrders: Handler = async (req, res) => {
    const orders = await Order.findAll();

    return orders;
};
