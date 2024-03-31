import { DataTypes, Model } from "sequelize";

import { sequelize } from "../";

type UserRoleAttributes = {
    user_id: number;
    role_id: number;
};

export class UserRole extends Model<UserRoleAttributes> {
    declare user_id: number;
    declare role_id: number;
}

UserRole.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    { sequelize, tableName: "users_roles", modelName: "user_role" }
);
