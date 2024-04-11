import { DataTypes, Model, Optional } from "sequelize";

import { sequelize } from "../";

import { PossibleRole } from "../../common";

type RoleAttributes = {
    id: number;
    name: PossibleRole;
};

type CreationRoleAttributes = Optional<RoleAttributes, "id">;

export class Role extends Model<RoleAttributes, CreationRoleAttributes> {
    declare id: number;
    declare name: PossibleRole;
}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.ENUM,
            values: Object.values(PossibleRole),
            allowNull: false,
            unique: true,
        },
    },
    { sequelize, tableName: "roles", modelName: "role" }
);
