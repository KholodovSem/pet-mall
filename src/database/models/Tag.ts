import { Model, DataTypes, type Optional } from "sequelize";

import { sequelize } from "../";

export type TagAttributes = {
    id: number;
    name: string;
};

type TagCreationAttributes = Optional<TagAttributes, "id">;

export class Tag extends Model<TagAttributes, TagCreationAttributes> {
    declare id: number;
    declare name: string;
}

Tag.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
    },
    { sequelize, tableName: "tags", modelName: "tag" }
);
