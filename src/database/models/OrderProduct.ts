import { DataTypes, Model } from "sequelize";

import { sequelize } from "..";

type OrderProductsAttributes = {
  userId: number;
};

export class OrderProduct extends Model<OrderProductsAttributes> {
  declare userId: number;
}

OrderProduct.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
    },
  },
  { sequelize, modelName: "order_product", tableName: "orders_products" }
);
