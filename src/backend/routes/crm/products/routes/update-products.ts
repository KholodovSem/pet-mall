import { Handler } from "express";
import { Op } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import { sftp } from "../../../../../sftp";
import { Product, ProductTag } from "../../../../../database/models";
import { NotFoundError } from "../../../../utils";

export const updateProduct: Handler = async (req, res) => {
    const params = req.params as Record<string, string | undefined>;
    const id = parseInt(params.id || "");

    const { name, price, quantity, tags, manufacturer_id, purpose_id } =
        req.body;

    const product = await Product.findOne({
        where: {
            id: {
                [Op.eq]: id,
            },
        },
    });

    if (!product) {
        throw new NotFoundError(`Product with id:${id} not found`);
    }

    let imagePath: string = "";

    if (req.file) {
        imagePath = `/product_images/${uuidv4({})}_${req.file.originalname}`;
        await sftp.put(req.file.buffer || "", imagePath);
    }

    await product.update({
        name,
        price,
        quantity,
        image: imagePath || null,
        manufacturer_id,
        purpose_id,
    });

    if (tags) {
        await ProductTag.destroy({
            where: {
                product_id: {
                    [Op.eq]: product.id,
                },
            },
        });

        await ProductTag.bulkCreate(
            tags.map((tagId: string) => ({
                product_id: product.id,
                tag_id: tagId,
            }))
        );
    }

    res.json(product);
};
