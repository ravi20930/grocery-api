import { Op, literal, fn, col, QueryTypes } from "sequelize";
import { User, Book, Order, UserImages, Customer } from "../models";
import { throwError } from "../utils/handler";
import { sequelize } from "../config/database";

export const profile = async (userId: string) => {
  return User.findByPk(userId);
};

export const findOrCreateByGoogleId = async (
  googleId: string,
  email: string
): Promise<User> => {
  let user = await User.findOne({ where: { googleId } });

  if (!user) {
    user = User.build({
      googleId,
      email,
    });
    await user.save();
  }

  return user;
};

export const uploadImage = async (userId: string, urls: string[]) => {
  await UserImages.bulkCreate(
    urls.map((imageUrl) => ({
      userId,
      imageUrl,
    }))
  );
};

export const createNewOrder = async (userId: string, bookIds: number[]) => {
  const customer = await Customer.findByPk(userId);
  if (!customer) {
    throwError(404, "Customer not found");
  }
  const books = await Book.findAll({
    where: {
      id: {
        [Op.in]: bookIds,
      },
    },
  });
  // console.log({ books, customer });

  if (!books || books.length !== bookIds.length) {
    throwError(404, "One or more books not found");
  }

  const totalBookPrice = books.reduce(
    (acc, book) => acc + parseFloat(book.price.toString()),
    0
  );

  console.log({ totalBookPrice });

  const order = Order.build({
    orderValue: totalBookPrice,
    customerId: userId,
  });
  await order.save();
  await order.addBooks(books.map((book) => book.id));
  return order;
};

export const topSellingBooks = async (count: number) => {
  const topSellingBooks = await sequelize.query(
    `
    SELECT
      b.id,
      b.title,
      b.isbn,
      b.price,
      COUNT(oi.bookId) AS orderCount
    FROM
      Books AS b
    LEFT JOIN
      OrderItem AS oi ON b.id = oi.bookId
    GROUP BY
      b.id
    ORDER BY
      orderCount DESC
    LIMIT :count;
    `,
    {
      replacements: { count },
      type: QueryTypes.SELECT,
    }
  );

  return topSellingBooks;
};
