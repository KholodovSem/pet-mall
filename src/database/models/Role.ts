import { DataTypes, Model, Optional } from "sequelize";

import { sequelize } from "../";

export enum UserRole {
    ADMIN = "admin",
    MANAGER = "manager",
}

type RoleAttributes = {
    id: number;
    role: UserRole;
};

type CreationRoleAttributes = Optional<RoleAttributes, "id">;

export class Role extends Model<RoleAttributes, CreationRoleAttributes> {
    declare id: number;
    declare role: UserRole;
}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM,
            values: Object.values(UserRole),
            allowNull: false,
        },
    },
    { sequelize }
);
