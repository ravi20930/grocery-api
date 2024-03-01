import Book from "./GroceryItem";
import Order from "./Order";
import User from "./User";
import Group from "./Group";
import UserGroup from "./UserGroup";
import GroceryItem from "./GroceryItem";

Group.hasOne(UserGroup, { as: "groupUser", foreignKey: "groupId" });
UserGroup.belongsTo(Group, { as: "group", foreignKey: "groupId" });
User.hasOne(UserGroup, { as: "userGroup", foreignKey: "userId" });

// Define the many-to-many association between Order and Book
Order.belongsToMany(Book, {
  through: "OrderItem",
  foreignKey: "orderId",
  otherKey: "bookId",
});

// Book Model
Book.belongsToMany(Order, {
  through: "OrderItem",
  foreignKey: "bookId",
  otherKey: "orderId",
});

// Associate Order with Customer (User)
Order.belongsTo(User, {
  foreignKey: "customerId",
  as: "customer",
});
User.hasMany(Order, {
  foreignKey: "customerId",
  as: "orders",
});

export { User, Group, UserGroup, Book, Order, GroceryItem };
