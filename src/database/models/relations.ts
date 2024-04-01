import { User } from "./User";
import { Product } from "./Product";
import { Tag } from "./Tag";
import { ProductTag } from "./ProductTag";
import { Order } from "./Order";
import { OrderProduct } from "./OrderProduct";
import { Role } from "./Role";
import { UserRole } from "./UserRole";
import { CRMUser } from "./CRMUser";
import { Manufacturer } from "./Manufacturer";
import { Purpose } from "./Purpose";

Product.belongsToMany(Tag, { through: ProductTag, foreignKey: "product_id" });
Tag.belongsToMany(Product, { through: ProductTag, foreignKey: "tag_id" });

Manufacturer.hasMany(Product, { foreignKey: "manufacturer_id" });
Product.belongsTo(Manufacturer, { foreignKey: "manufacturer_id" });

Purpose.hasMany(Product, { foreignKey: "purpose_id" });
Product.belongsTo(Purpose, { foreignKey: "purpose_id" });

User.hasMany(Order);
Order.belongsTo(User, { foreignKey: "user_id" });

Order.hasMany(Product, { foreignKey: "order_id" });
Product.belongsToMany(Order, {
    through: OrderProduct,
    foreignKey: "product_id",
});

CRMUser.belongsToMany(Role, { through: UserRole, foreignKey: "user_id" });
Role.belongsToMany(CRMUser, { through: UserRole, foreignKey: "role_id" });
