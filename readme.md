# Bookstore Management System

This project is a basic Bookstore Management, including user authentication, order management, and administrative tasks. Below is an overview of the model structure and available endpoints.

### Technologies Used

- **TypeScript**
- **Express.js**
- **Sequelize**
- **MySQL**
- **Amazon S3**
- **Google APIs**

### Functionality

- Users can upload images, create orders, and view their profile.
- Admins can perform administrative tasks like creating admin accounts, fetching user data, and generating revenue reports.

## Model Structure

1. **User**: Represents users of the system.
2. **Group**: Defines user groups for organizational purposes.
3. **UserGroup**: Represents the association between users and groups.
4. **UserImages**: Stores images uploaded by users.
5. **Book**: Represents books available in the bookstore.
6. **Order**: Represents orders placed by customers.
7. **Customer**: Represents customers who place orders.
8. **Author**: Represents authors of the books.

### Associations

- **User - UserImages**: One-to-Many relationship for users and their uploaded images.
- **Group - UserGroup**: One-to-One relationship between groups and user groups.
- **Author - Book**: One-to-Many relationship between authors and books.
- **Order - Book**: Many-to-Many relationship through the `OrderItem` model.
- **Order - Customer**: One-to-Many relationship between orders and customers.

## Endpoints

### Authentication

- **POST /auth/google/login**: Initiates Google OAuth2 login.
- **GET /auth/google/callback**: Handles Google OAuth2 callback.

### User Routes

- **POST /user/upload-image**: Uploads images for a user profile.
- **POST /user/create-order**: Creates a new order.
- **GET /user**: Retrieves user profile information.
- **GET /user/top-sellers**: Retrieves top-selling books.

### Admin Routes

- **GET /admin/get-token**: Retrieves authentication token of any user.
- **GET /admin/users**: Retrieves all users.
- **POST /admin/create-admin**: Creates a new admin user.
- **GET /admin/revenue**: Retrieves revenue statistics.
