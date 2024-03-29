import { DataTypes, Model, Optional } from "sequelize";

import { sequelize } from "..";

enum UserPermission {
    CREATE = "create",
    READ = "read",
    WRITE = "write",
    DELETE = "delete",
}

type PermissionAttributes = {
    id: number;
    permission: UserPermission;
};

type CreationPermissionAttributes = Optional<PermissionAttributes, "id">;

export class Permission extends Model<PermissionAttributes, CreationPermissionAttributes> {
    declare id: number;
    declare permission: UserPermission;
}

Permission.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        permission: {
            type: DataTypes.ENUM,
            values: Object.values(UserPermission),
            allowNull: false,
        },
    },
    { sequelize }
);
