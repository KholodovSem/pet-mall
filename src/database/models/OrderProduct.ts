import { DataTypes, Model } from "sequelize";

import { sequelize } from "..";

type OrderProductsAttributes = {
    productId: number;
    orderId: number;
};

export class OrderProduct extends Model<OrderProductsAttributes> {
    declare productId: number;
    declare orderId: number;
}

OrderProduct.init(
    {
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "product_id",
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "order_id",
        },
    },
    { sequelize, modelName: "order_product", tableName: "orders_products" }
);
