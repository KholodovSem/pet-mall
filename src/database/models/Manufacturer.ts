import { DataTypes, Model, Optional } from "sequelize";

import { sequelize } from "../";

import { Product } from "./Product";

export type ManufacturerAttributes = {
    id: number;
    name: string;
};

type CreatingManufacturerAttributes = Optional<ManufacturerAttributes, "id">;

export class Manufacturer extends Model<
    ManufacturerAttributes,
    CreatingManufacturerAttributes
> {
    declare id: number;
    declare name: string;
}

Manufacturer.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    { sequelize, tableName: "manufacturers", modelName: "manufacturer" }
);

Manufacturer.afterDestroy(async (instance, options) => {
    await Product.destroy({ where: { manufacturer_id: instance.id } });
});
