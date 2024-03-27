import { Product } from "./Product";
import { Tag } from "./Tag";
import { ProductTags } from "./ProductTags";

Product.belongsToMany(Tag, { through: ProductTags, foreignKey: "product_id" });
Tag.belongsToMany(Product, { through: ProductTags, foreignKey: "tag_id" });
