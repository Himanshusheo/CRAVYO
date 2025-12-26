# 🍔 CRAVYO - Food Delivery Platform

A full-stack food ordering and delivery web application built with the MERN (MongoDB, Express.js, React, Node.js) stack. CRAVYO provides a seamless experience for customers to browse, order, and pay for food online, while offering administrators a comprehensive panel to manage products, orders, and inventory.

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Running the Application](#running-the-application)
- [Authentication & Authorization](#authentication--authorization)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 About the Project

CRAVYO is a modern, responsive food delivery platform designed to bridge the gap between customers and restaurants. The application consists of three main components:

1. **User Frontend** - A React-based customer-facing interface where users can browse menus, add items to cart, place orders, and track their order history.
2. **Admin Panel** - A dedicated administrative interface for managing food items, viewing orders, and updating order statuses.
3. **Backend API** - A RESTful API built with Express.js that handles authentication, order processing, payment integration, and database operations.

The application implements secure JWT-based authentication, integrates Stripe for payment processing, and uses MongoDB for data persistence. The architecture follows MVC (Model-View-Controller) patterns, ensuring clean code organization and maintainability.

## ✨ Key Features

### User Features
- **User Authentication**: Secure registration and login system with JWT tokens
- **Product Browsing**: Browse food items with categories and search functionality
- **Shopping Cart**: Add, remove, and manage items in the cart with real-time updates
- **Order Placement**: Place orders with delivery address and payment processing
- **Payment Integration**: Secure payment processing via Stripe checkout
- **Order Tracking**: View order history and track order status
- **Responsive Design**: Mobile-friendly interface for optimal user experience

### Admin Features
- **Product Management**: Add, update, and remove food items with image uploads
- **Order Management**: View all orders and update order status (pending, preparing, on the way, delivered)
- **Dashboard**: Overview of all orders with filtering and search capabilities
- **User Management**: Role-based access control for admin operations

### Technical Features
- **JWT Authentication**: Secure token-based authentication system
- **Password Encryption**: Bcrypt hashing for secure password storage
- **RESTful API**: Well-structured API endpoints following REST principles
- **File Upload**: Multer integration for handling food item images
- **Error Handling**: Comprehensive error handling and validation
- **Toast Notifications**: User-friendly notifications for actions and errors
- **Environment Variables**: Secure configuration management

## 🛠 Tech Stack

### Frontend
- **React 18.3** - UI library for building user interfaces
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Toastify** - Toast notification library
- **Vite** - Fast build tool and development server
- **CSS3** - Styling and responsive design

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling tool
- **JWT (JSON Web Tokens)** - Authentication and authorization
- **Bcrypt** - Password hashing library
- **Multer** - File upload middleware
- **Stripe** - Payment processing integration
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Development Tools
- **Nodemon** - Auto-restart server during development
- **ESLint** - Code linting and quality assurance

## 🏗 Project Architecture

The application follows a three-tier architecture:

```
┌─────────────────┐
│   User Frontend │  (React + Vite)
│   Port: 5173    │
└────────┬────────┘
         │
         │ HTTP Requests
         │
┌────────▼────────┐
│  Backend API    │  (Express + Node.js)
│  Port: 4000     │
└────────┬────────┘
         │
         │ Database Operations
         │
┌────────▼────────┐
│    MongoDB      │  (Database)
│  (Cloud/Local)  │
└─────────────────┘

┌─────────────────┐
│   Admin Panel   │  (React + Vite)
│   Port: 5174    │
└────────┬────────┘
         │
         │ Admin Requests
         │
└────────┴────────┘
    (Same Backend)
```

The backend serves as a centralized API server handling requests from both the user frontend and admin panel. All client-server communication is stateless, using JWT tokens for authentication.

## 📁 Project Structure

```
CRAVYO/
│
├── frontend/                 # User-facing React application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── assets/         # Images, icons, and static data
│   │   ├── components/     # Reusable React components
│   │   │   ├── Header/     # Hero section header
│   │   │   ├── Navbar/     # Navigation bar
│   │   │   ├── Footer/     # Footer component
│   │   │   ├── FoodDisplay/# Food items grid display
│   │   │   ├── FoodItem/   # Individual food item card
│   │   │   ├── ExploreMenu/# Category selector
│   │   │   ├── LoginPopup/ # Login/Register modal
│   │   │   └── AppDownload/# App download section
│   │   ├── pages/          # Page components
│   │   │   ├── Home/       # Home page
│   │   │   ├── Cart/       # Shopping cart page
│   │   │   ├── PlaceOrder/ # Order placement page
│   │   │   ├── Verify/     # Payment verification page
│   │   │   └── MyOrders/   # Order history page
│   │   ├── context/        # React Context API
│   │   │   └── StoreContext.jsx  # Global state management
│   │   ├── App.jsx         # Main App component
│   │   └── main.jsx        # Application entry point
│   ├── package.json
│   └── vite.config.js
│
├── admin/                    # Admin panel React application
│   ├── public/
│   ├── src/
│   │   ├── assets/         # Admin assets
│   │   ├── components/
│   │   │   ├── Navbar/     # Admin navigation
│   │   │   ├── Sidebar/    # Admin sidebar menu
│   │   │   └── Login/      # Admin login component
│   │   ├── pages/
│   │   │   ├── Add/        # Add food items
│   │   │   ├── List/       # List all food items
│   │   │   └── Orders/     # Manage orders
│   │   ├── context/
│   │   │   └── StoreContext.jsx
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/                  # Express.js API server
│   ├── config/
│   │   └── db.js           # MongoDB connection configuration
│   ├── controllers/         # Business logic handlers
│   │   ├── userController.js    # User authentication logic
│   │   ├── foodController.js    # Food item CRUD operations
│   │   ├── cartController.js    # Shopping cart operations
│   │   └── orderController.js   # Order processing logic
│   ├── middleware/
│   │   └── auth.js         # JWT authentication middleware
│   ├── models/             # Mongoose schemas
│   │   ├── userModel.js    # User schema
│   │   ├── foodModel.js    # Food item schema
│   │   └── orderModel.js   # Order schema
│   ├── routes/             # API route definitions
│   │   ├── userRoute.js    # User authentication routes
│   │   ├── foodRoute.js    # Food item routes
│   │   ├── cartRoute.js    # Cart routes
│   │   └── orderRoute.js   # Order routes
│   ├── uploads/            # Uploaded food images
│   ├── server.js           # Server entry point
│   ├── package.json
│   └── .env.example        # Environment variables template
│
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (v8 or higher) - Comes with Node.js
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use MongoDB Atlas (cloud)
- **Git** - [Download](https://git-scm.com/)
- **Stripe Account** - For payment processing (create at [stripe.com](https://stripe.com))

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <project-folder>
```

### 2. Install Dependencies

Install dependencies for all three parts of the application:

**Frontend:**
```bash
cd frontend
npm install
cd ..
```

**Admin Panel:**
```bash
cd admin
npm install
cd ..
```

**Backend:**
```bash
cd backend
npm install
cd ..
```

### 3. Environment Variables Setup

Create a `.env` file in the `backend` folder:

```bash
cd backend
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Server Configuration
PORT=4000

# Database
MONGO_URL=mongodb://localhost:27017/cravyo
# Or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/cravyo

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_here
SALT=10

# Stripe Payment
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here

# Frontend URL (for Stripe redirects)
FRONTEND_URL=http://localhost:5173
```

**Important Notes:**
- Replace `JWT_SECRET` with a strong, random string
- Use your MongoDB connection string (local or Atlas)
- Get your Stripe secret key from the [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
- `SALT` is the number of rounds for bcrypt hashing (10 is recommended)

### 4. Configure API URLs

Update the backend URL in the frontend and admin applications:

**Frontend** (`frontend/src/context/StoreContext.jsx`):
```jsx
const url = "http://localhost:4000"; // Your backend URL
```

**Admin Panel** (`admin/src/App.jsx`):
```jsx
const url = "http://localhost:4000"; // Your backend URL
```

> **Note:** For production, use environment variables instead of hardcoded URLs.

### 5. Create MongoDB Database

If using local MongoDB, make sure MongoDB service is running:

```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

The database will be created automatically when the backend connects.

## 📚 API Documentation

### Base URL
```
http://localhost:4000/api
```

### Authentication
Most endpoints require authentication via JWT token. Include the token in the request header:
```
Authorization: Bearer <your_jwt_token>
```

### User Routes (`/api/user`)

#### Register User
```http
POST /api/user/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "token": "jwt_token_here"
  }
}
```

#### Login User
```http
POST /api/user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "token": "jwt_token_here"
  }
}
```

### Food Routes (`/api/food`)

#### List All Food Items
```http
GET /api/food/list
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "food_id",
      "name": "Burger",
      "description": "Delicious burger",
      "price": 12.99,
      "image": "/images/food_1.png",
      "category": "Fast Food"
    }
  ]
}
```

#### Add Food Item (Admin Only)
```http
POST /api/food/add
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data

{
  "name": "Pizza",
  "description": "Cheesy pizza",
  "price": 15.99,
  "category": "Italian",
  "image": <file>
}
```

#### Remove Food Item (Admin Only)
```http
POST /api/food/remove
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "id": "food_id"
}
```

### Cart Routes (`/api/cart`)

#### Add to Cart
```http
POST /api/cart/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "itemId": "food_id"
}
```

#### Remove from Cart
```http
POST /api/cart/remove
Authorization: Bearer <token>
Content-Type: application/json

{
  "itemId": "food_id"
}
```

#### Get Cart
```http
POST /api/cart/get
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "food_id": 2,
    "another_food_id": 1
  }
}
```

### Order Routes (`/api/order`)

#### Place Order
```http
POST /api/order/place
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "name": "Burger",
      "price": 12.99,
      "quantity": 2
    }
  ],
  "amount": 25.98,
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipcode": "10001"
  }
}
```

**Response:**
```json
{
  "success": true,
  "session_url": "https://checkout.stripe.com/pay/..."
}
```

#### Verify Order (After Payment)
```http
POST /api/order/verify
Content-Type: application/json

{
  "orderId": "order_id",
  "success": "true"
}
```

#### Get User Orders
```http
POST /api/order/userorders
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "user_id"
}
```

#### List All Orders (Admin Only)
```http
GET /api/order/list
Authorization: Bearer <admin_token>
```

#### Update Order Status (Admin Only)
```http
POST /api/order/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "orderId": "order_id",
  "status": "Preparing"
}
```

### Image Route

Food item images are served from:
```
GET /images/:filename
```

Example: `http://localhost:4000/images/1722865444288food_1.png`

## 🏃 Running the Application

### Development Mode

Open three separate terminal windows/tabs:

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run server
# Server will start on http://localhost:4000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Frontend will start on http://localhost:5173
```

**Terminal 3 - Admin Panel:**
```bash
cd admin
npm run dev
# Admin panel will start on http://localhost:5174 (or next available port)
```

### Production Build

**Build Frontend:**
```bash
cd frontend
npm run build
# Output will be in frontend/dist/
```

**Build Admin:**
```bash
cd admin
npm run build
# Output will be in admin/dist/
```

**Start Backend (Production):**
```bash
cd backend
npm start
```

## 🔐 Authentication & Authorization

### User Roles

The application supports two user roles:

1. **User** (Default)
   - Can browse food items
   - Add items to cart
   - Place orders
   - View own order history

2. **Admin**
   - All user permissions
   - Add/edit/remove food items
   - View all orders
   - Update order status

### Creating an Admin User

To create an admin user, you can either:

1. Use MongoDB shell or MongoDB Compass to update a user's role:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

2. Modify the registration endpoint temporarily to set role to "admin" for testing.

### JWT Token Flow

1. User registers/logs in
2. Backend validates credentials
3. JWT token is generated and sent to client
4. Client stores token in localStorage
5. Token is included in subsequent API requests
6. Backend middleware validates token on protected routes

## 🌐 Deployment

### Backend Deployment

The backend can be deployed on:
- **Render** - [render.com](https://render.com)
- **Heroku** - [heroku.com](https://heroku.com)
- **Railway** - [railway.app](https://railway.app)
- **DigitalOcean** - [digitalocean.com](https://digitalocean.com)

**Important:** 
- Set environment variables in your hosting platform
- Update `FRONTEND_URL` to your production frontend URL
- Ensure MongoDB connection string is configured
- Add your Stripe secret key (use production key for live deployment)

### Frontend & Admin Deployment

Deploy static builds to:
- **Vercel** - [vercel.com](https://vercel.com)
- **Netlify** - [netlify.com](https://netlify.com)
- **Cloudflare Pages** - [pages.cloudflare.com](https://pages.cloudflare.com)

**Steps:**
1. Build the application: `npm run build`
2. Upload the `dist` folder to your hosting platform
3. Update backend URL in code before building
4. Configure environment variables if using build-time variables

### Database

- Use **MongoDB Atlas** for cloud database (recommended)
- Or set up MongoDB on your VPS/server

## 🤝 Contributing

Contributions are welcome! To contribute to this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate tests/documentation.

## 📧 Contact & Support

For questions, suggestions, or support, please:
- Open an issue on GitHub
- Contact: contact@cravyo.com

---

**Built with ❤️ using the MERN Stack**

