# Express Authentication System

A robust authentication system built with Express.js, MongoDB, and JWT (JSON Web Tokens).

## Features

- User registration and login
- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes with JWT verification
- MongoDB database integration

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- JSON Web Tokens (JWT)
- bcryptjs for password hashing

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed locally or a MongoDB Atlas account

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-username/express-auth-system.git
   cd express-auth-system
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Run the application
   ```
   npm start
   ```
   
   For development with nodemon:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication

- **POST /api/auth/register** - Register a new user
- **POST /api/auth/login** - Login and receive an authentication token

### User

- **GET /api/users/me** - Get current user information (protected route)

## Project Structure

```
├── config/
│   └── db.js          # Database connection configuration
├── middleware/
│   └── auth.js        # Authentication middleware
├── models/
│   └── User.js        # User model
├── routes/
│   └── auth.js        # Authentication routes
├── .env               # Environment variables
├── .gitignore         # Gitignore file
├── package.json       # Project dependencies
├── server.js          # Main application file
└── README.md          # Project documentation
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
