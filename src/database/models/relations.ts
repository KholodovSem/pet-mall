import { User } from "./User";
import { Product } from "./Product";
import { Tag } from "./Tag";
import { ProductTag } from "./ProductTag";
import { Order } from "./Order";
import { OrderProduct } from "./OrderProduct";
import { Role } from "./Role";
import { UserRole } from "./UserRole";
import { CRMUser } from "./CRMUser";

Product.belongsToMany(Tag, { through: ProductTag, foreignKey: "product_id" });
Tag.belongsToMany(Product, { through: ProductTag, foreignKey: "tag_id" });

User.hasMany(Order);
Order.belongsTo(User, { foreignKey: "user_id" });

Order.hasMany(Product, { foreignKey: "order_id" });
Product.belongsToMany(Order, { through: OrderProduct, foreignKey: "product_id" });

CRMUser.belongsToMany(Role, { through: UserRole, foreignKey: "user_id" });
Role.belongsToMany(CRMUser, { through: UserRole, foreignKey: "role_id" });
