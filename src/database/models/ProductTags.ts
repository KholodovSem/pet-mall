import { DataTypes, Model } from "sequelize";

import { sequelize } from "../";

type ProductTagsAttributes = {
  productId: number;
  tagId: number;
};

export class ProductTags extends Model<ProductTagsAttributes> {
  declare productId: number;
  declare tagId: number;
}

ProductTags.init(
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
  { sequelize, tableName: "product_tags" }
);
