import { Model, DataTypes, type Optional } from "sequelize";

import { sequelize } from "../";

export type ProductAttributes = {
    id: number;
    company: string;
    purpose: string;
    price: number;
    quantity: number;
    image: string | null;
};

type ProductCreationAttributes = Optional<ProductAttributes, "id">;

export class Product extends Model<ProductAttributes, ProductCreationAttributes> {
    declare id: number;
    declare company: string;
    declare purpose: string;
    declare price: number;
    declare quantity: number;
    declare image: string | null;
}

Product.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
        },
        quantity: {
            type: DataTypes.INTEGER,
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
