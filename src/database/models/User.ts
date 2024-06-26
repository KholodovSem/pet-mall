import { Model, DataTypes, type Optional } from "sequelize";

import { sequelize } from "../";

type UserAttributes = {
    id: number;
    email: string;
    password: string;
};

type UserCreationAttributes = Optional<UserAttributes, "id">;

export class User extends Model<UserAttributes, UserCreationAttributes> {
    declare id: number;
    declare email: string;
    declare password: string;
}

User.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { sequelize, tableName: "users", modelName: "user" }
);
