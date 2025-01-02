# Product Management API

## Overview
This project is a backend application built with **NestJS** to manage products. It includes authentication and role-based access control (RBAC) using **JWT** and custom **guards**. The application allows users with the `admin` role to create, update, and delete products, while general users can view product information.

---

## Features

- **Authentication**: JWT-based authentication.
- **Authorization**: Role-based access control using custom guards.
- **CRUD Operations**: Create, read, update, and delete products.
- **Swagger API Documentation**: Easily explore and test API endpoints.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (>= 16.x)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) or another TypeORM-compatible database

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and configure the following variables:
   ```env
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRATION_TIME=3600
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USERNAME=your_db_user
   DATABASE_PASSWORD=your_db_password
   DATABASE_NAME=your_db_name
   ```

4. **Run Database Migrations**:
   ```bash
   npm run typeorm migration:run
   ```

---

## Running the Application

### Development Mode
```bash
npm run start:dev
```

### Production Mode
```bash
npm run build
npm run start:prod
```

### Swagger Documentation
Navigate to `http://localhost:<PORT>/api` to access the Swagger UI and test API endpoints.

---

## API Endpoints

### Authentication Endpoints

- **Login**: `POST /auth/login`
  - Request: `{ email: string, password: string }`
  - Response: `{ access_token: string }`

### Product Endpoints

- **Create Product**: `POST /product`
  - Requires `admin` role.
  - Body: `{ name: string, price: number, description: string }`

- **Get All Products**: `GET /product`
  - Accessible to all users.

- **Get Product by ID**: `GET /product/:id`
  - Accessible to all users.

- **Update Product**: `PUT /product/:id`
  - Requires `admin` role.

- **Delete Product**: `DELETE /product/:id`
  - Requires `admin` role.

---

## Project Structure

```plaintext
src/
├── auth-user/           # Authentication and Authorization logic
│   ├── decorators/      # Custom decorators (e.g., Roles)
│   ├── guards/          # Role-based and Auth guards
│   ├── jwt.strategy.ts  # JWT Strategy for authentication
│   └── auth-user.module.ts
├── product/             # Product module
│   ├── dto/             # Data Transfer Objects for validation
│   ├── entities/        # Database entities
│   ├── product.service.ts
│   └── product.controller.ts
├── app.module.ts        # Root module
└── main.ts              # Application entry point
```

---

## Tests

Run tests using the following command:
```bash
npm run test
```

---

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push to the branch.
5. Create a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For issues or questions, please contact:

- **Email**: your-email@example.com
- **GitHub**: [your-github-profile](https://github.com/your-github-profile)

