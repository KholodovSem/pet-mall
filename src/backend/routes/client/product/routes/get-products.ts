import { type Handler } from "express";
import { Op, WhereOptions } from "sequelize";

import {
    Product,
    Tag,
    type TagAttributes,
    type ManufacturerAttributes,
    type PurposeAttributes,
    Manufacturer,
    Purpose,
} from "../../../../../database/models";

export const getProducts: Handler = async (req, res) => {
    const query = req.query as Record<string, string | undefined>;
    const page = parseInt(query.page || "");
    const limit = parseInt(query.limit || "") || undefined;
    const offset = page && limit ? (page - 1) * limit : undefined;

    const { manufacturer, purpose, tags } = query;

    const tagNames = tags?.split(",").map((tag) => tag.toLowerCase().trim());

    const tagWhere: WhereOptions<TagAttributes> = {};
    const manufacturerWhere: WhereOptions<ManufacturerAttributes> = {};
    const purposeWhere: WhereOptions<PurposeAttributes> = {};

    if (tagNames) {
        tagWhere.name = {
            [Op.in]: tagNames,
        };
    }

    if (manufacturer) {
        manufacturerWhere.name = {
            [Op.eq]: manufacturer,
        };
    }

    if (purpose) {
        purposeWhere.name = {
            [Op.eq]: purpose,
        };
    }

    const products = await Product.findAll({
        include: [
            {
                model: Tag,
                where: tagWhere,
            },
            {
                model: Manufacturer,
                where: manufacturerWhere,
            },
            {
                model: Purpose,
                where: purposeWhere,
            },
        ],
        limit: limit,
        offset: offset,
    });

    return res.json(products);
};
