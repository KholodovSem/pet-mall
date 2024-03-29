import { DataTypes, Model } from "sequelize";

import { sequelize } from "..";

type ProductTagsAttributes = {
    productId: number;
    tagId: number;
};

export class ProductTag extends Model<ProductTagsAttributes> {
    declare productId: number;
    declare tagId: number;
}

ProductTag.init(
    {
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "product_id",
        },
        tagId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "tag_id",
        },
    },
    { sequelize, modelName: "product_tag", tableName: "products_tags" }
);
