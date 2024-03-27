import { Model, DataTypes, type Optional } from "sequelize";

import { sequelize } from "./";

export enum PetType {
    CATS = "cats",
    DOGS = "dogs",
    BIRDS = "birds"
}

type ProductAttributes = {
    id: number;
    company: string;
    petType: string;
}

type ProductCreationAttributes = Optional<ProductAttributes, 'id'>

export default function (sequelizeInstance: typeof sequelize) {
    class Product extends Model<ProductAttributes, ProductCreationAttributes> {
        declare id: number;
        declare company: string;
        declare petType: PetType;
    }

    Product.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            company: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            petType: {
                field: 'pet_type',
                type: DataTypes.ENUM('cats'),
                // type: DataTypes.ENUM(...Object.keys(PetType)),
                allowNull: false
            }
        },
        { sequelize: sequelizeInstance, tableName: "products", modelName: 'product' }
    );

    return Product;
}



