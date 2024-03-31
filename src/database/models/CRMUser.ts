import { DataTypes, Model, Optional, CreationOptional, NonAttribute } from "sequelize";

import { sequelize } from "../";

import { Role } from "./Role";

type CRMUserAttributes = {
    id: number;
    email: string;
    password: string;
};

type CreationCRMUserAttributes = Optional<CRMUserAttributes, "id">;

export class CRMUser extends Model<CRMUserAttributes, CreationCRMUserAttributes> {
    declare id: CreationOptional<number>;
    declare email: string;
    declare password: string;

    declare roles: NonAttribute<Role[]>;
}

CRMUser.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
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
    { sequelize, tableName: "crm_users", modelName: "crm_user" }
);
