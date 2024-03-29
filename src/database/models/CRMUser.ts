import { DataTypes, Model, Optional } from "sequelize";

import { sequelize } from "..";

type CRMUserAttributes = {
    id: number;
    email: string;
    password: string;
};

type CreationCRMUserAttributes = Optional<CRMUserAttributes, "id">;

export class CRMUser extends Model<CRMUserAttributes, CreationCRMUserAttributes> {
    declare id: number;
    declare email: string;
    declare password: string;
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
    { sequelize }
);
