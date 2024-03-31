import { DataTypes, Model } from "sequelize";

import { sequelize } from "..";

type OrderProductsAttributes = {
    product_id: number;
    order_id: number;
};

export class OrderProduct extends Model<OrderProductsAttributes> {
    declare product_id: number;
    declare order_id: number;
}

OrderProduct.init(
    {
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "product_id",
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "order_id",
        },
    },
    { sequelize, modelName: "order_product", tableName: "orders_products" }
);
