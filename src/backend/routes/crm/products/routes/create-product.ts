import { Handler } from "express";
import { v4 as uuidv4 } from "uuid";

import { sftp } from "../../../../../sftp";
import { Product, ProductTag } from "../../../../../database/models";

export const createProduct: Handler = async (req, res) => {
    const { name, price, quantity, tags, manufacturer_id, purpose_id } =
        req.body;

    let imagePath: string = "";

    if (req.file) {
        imagePath = `/product_images/${uuidv4({})}_${req.file.originalname}`;
        await sftp.put(req.file.buffer || "", imagePath);
    }

    const product = await Product.create({
        name,
        price,
        quantity,
        image: imagePath || null,
        manufacturer_id,
        purpose_id,
    });

    if (tags) {
        await ProductTag.bulkCreate(
            tags.map((tagId: string) => ({
                product_id: product.id,
                tag_id: tagId,
            }))
        );
    }

    res.json(product);
};
