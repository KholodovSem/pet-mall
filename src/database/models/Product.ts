import { Model, DataTypes, type Optional } from "sequelize";

import { sequelize } from "../";

export type ProductAttributes = {
  id: number;
  company: string;
  purpose: string;
};

type ProductCreationAttributes = Optional<ProductAttributes, "id">;

export class Product extends Model<ProductAttributes, ProductCreationAttributes> {
  declare id: number;
  declare company: string;
  declare purpose: string;
}

Product.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    purpose: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, tableName: "products", modelName: "product" }
);
