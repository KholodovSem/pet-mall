import { DataTypes, Model, Op } from "sequelize";

import { sequelize } from "..";

type ProductTagsAttributes = {
    product_id: number;
    tag_id: number;
};

export class ProductTag extends Model<ProductTagsAttributes> {
    declare product_id: number;
    declare tag_id: number;
}

ProductTag.init(
    {
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "product_id",
        },
        tag_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "tag_id",
        },
    },
    {
        sequelize,
        modelName: "product_tag",
        tableName: "products_tags",
    }
);
