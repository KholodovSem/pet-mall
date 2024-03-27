import { Model, DataTypes, type Optional } from "sequelize";

import { sequelize } from "./";

type TagAttributes = {
    id: number;
    name: string;
}

type TagCreationAttributes = Optional<TagAttributes, 'id'>

export default function (sequelizeInstance: typeof sequelize) {
    class Tag extends Model<TagAttributes, TagCreationAttributes> {
        declare id: number;
        declare name: string;
    }

    Tag.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        { sequelize: sequelizeInstance, tableName: "tags", modelName: 'tag' }
    );

    return Tag;
}