import { type Handler } from "express";

import { Product, Tag } from '../../../database/models';

export const getProducts: Handler = async (req, res) => {
    const query = req.query as Record<string, string | undefined>;
    const page = parseInt(query.page || '');
    const limit = parseInt(query.limit || '') || undefined;
    const offset = page && limit ? (page - 1) * limit : undefined;

    //TODO: Filtering by: (company, petType, tags)

    const { company, petType, tags } = query;

    const products = await Product.findAll({
        include: {
            model: Tag,
        },
        where: { company, petType },
        limit: limit,
        offset: offset
    })

    return res.json(products);
}