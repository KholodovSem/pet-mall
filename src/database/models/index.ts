import createProduct from './Product';
import createTag from './Tag';

import { Sequelize } from "sequelize";
import { config } from '../../config';

export const sequelize = new Sequelize({
    dialect: "postgres",
    storage: "postgres:5432/postgres",
    host: "localhost",
    username: "postgres",
    password: config.database.password,
});


export const Product = createProduct(sequelize);
export const Tag = createTag(sequelize);

Product.belongsToMany(Tag, { foreignKey: 'product_id', through: 'product_tag' });
Tag.belongsToMany(Product, { foreignKey: 'tag_id', through: 'product_tag' });
