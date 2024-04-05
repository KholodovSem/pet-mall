import { DataTypes, Model, type Optional } from "sequelize";

import { sequelize } from "../index";

export enum OrderStatus {
    PENDING = "pending",
    PROCESSING = "processing",
    APPROVE = "approve",
    DECLINED = "declined",
    DELIVERY = "delivery",
    DONE = "done",
}

type OrderAttributes = {
    id: number;
    status: OrderStatus;
    user_id: number;
};

type OrderCreationAttributes = Optional<OrderAttributes, "id">;

export class Order extends Model<OrderAttributes, OrderCreationAttributes> {
    declare id: number;
    declare status: OrderStatus;
    declare user_id: number;
}

Order.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM,
            values: Object.values(OrderStatus),
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    { sequelize, modelName: "order", tableName: "orders" }
);
