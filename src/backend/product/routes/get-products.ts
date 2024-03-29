import { type Handler } from "express";
import { Op, WhereOptions } from "sequelize";

import { Product, type ProductAttributes, Tag, type TagAttributes } from "../../../database/models";

export const getProducts: Handler = async (req, res) => {
    const query = req.query as Record<string, string | undefined>;
    const page = parseInt(query.page || "");
    const limit = parseInt(query.limit || "") || undefined;
    const offset = page && limit ? (page - 1) * limit : undefined;

    const { company, purpose, tags } = query;

    const tagNames = tags?.split(",").map((tag) => tag.toLowerCase().trim());

    const productWhere: WhereOptions<ProductAttributes>[] = [];
    const tagWhere: WhereOptions<TagAttributes> = {};

    console.log('Product where:', productWhere);
    console.log('Tag where:', tagWhere);


    if (company || purpose) {
        if (company) {
            productWhere.push({
                company: {
                    [Op.iLike]: `${company.trim()}`,
                },
            });
        }

        if (purpose) {
            productWhere.push({
                purpose: {
                    [Op.iLike]: `${purpose.trim()}`,
                },
            });
        }
    }

    if (tagNames) {
        tagWhere.name = {
            [Op.in]: tagNames,
        };
    }

    const products = await Product.findAll({
        include: {
            model: Tag,
            where: tagWhere,
        },
        where: {
            [Op.and]: productWhere,
        },
        limit: limit,
        offset: offset,
    });

    return res.json(products);
};
