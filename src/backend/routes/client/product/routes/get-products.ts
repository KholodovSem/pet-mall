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

    const { company, purpose, tags } = query;

    const tagNames = tags?.split(",").map((tag) => tag.toLowerCase().trim());

    const tagWhere: WhereOptions<TagAttributes> = {};
    const companyWhere: WhereOptions<ManufacturerAttributes> = {};
    const purposeWhere: WhereOptions<PurposeAttributes> = {};

    if (purpose) {
        tagWhere.name = {
            [Op.in]: tagNames,
        };
    }

    if (company) {
        companyWhere.name = {
            [Op.eq]: company,
        };
    }

    if (tagNames) {
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
                where: companyWhere,
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
