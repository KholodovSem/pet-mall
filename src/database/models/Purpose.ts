import { DataTypes, Model, Optional } from "sequelize";

import { sequelize } from "../";
import { Product } from "./Product";

export type PurposeAttributes = {
    id: number;
    name: string;
};

type CreationPurposeAttributes = Optional<PurposeAttributes, "id">;

export class Purpose extends Model<
    PurposeAttributes,
    CreationPurposeAttributes
> {
    declare id: number;
    declare name: string;
}

Purpose.init(
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
    { sequelize, tableName: "purposes", modelName: "purpose" }
);
