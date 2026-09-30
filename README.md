# MERN Authentication System

A production-ready, clean-architecture MERN (MongoDB, Express, React, Node.js) authentication project featuring JSON Web Tokens (JWT), bcrypt password hashing, React Router v6, Axios with interceptors, and Tailwind CSS.

---

## 📁 Project Structure

```text
Genhab/
├── server/                       # Express + Mongoose Backend
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js             # Mongoose connection & event handling
│   │   ├── controllers/
│   │   │   └── authController.js # registerUser, loginUser, getMe
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js # JWT verification (protect)
│   │   │   └── errorMiddleware.js# 404 & Central error handling
│   │   ├── models/
│   │   │   └── User.js           # Schema, pre-save bcrypt hook, password matching
│   │   ├── routes/
│   │   │   └── authRoutes.js     # /register, /login, /me endpoints
│   │   ├── utils/
│   │   │   └── generateToken.js  # JWT signing helper
│   │   └── server.js             # Express app setup, CORS & middleware
│   ├── .env.example              # Server environment template
│   ├── .env                      # Server active environment config
│   └── package.json
│
├── client/                       # React + Vite Frontend
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js          # Axios instance with Bearer token interceptor
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Responsive navigation & session status
│   │   │   └── ProtectedRoute.jsx# Auth guard with loading spinner
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # State, login, register, logout & sync
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx     # Protected view with live /me token verify
│   │   │   ├── Login.jsx         # Sign In form with password toggle & validation
│   │   │   ├── Register.jsx      # Registration form with match indicator
│   │   │   └── NotFound.jsx      # 404 page
│   │   ├── App.jsx               # Router & AuthProvider configuration
│   │   ├── index.css             # Tailwind directives & glassmorphic styling
│   │   └── main.jsx
│   ├── tailwind.config.js        # Tailwind CSS v3 configuration
│   ├── postcss.config.js
│   ├── .env.example              # Client environment template
│   ├── .env                      # Client active environment config
│   └── package.json
│
├── .gitignore
├── package.json                  # Root runner scripts
└── README.md
```

---

## ⚙️ Environment Variables

### Server (`server/.env` / `server/.env.example`)

| Variable | Description | Default |
| :--- | :--- | :--- |
| `PORT` | Express server port | `5000` |
| `NODE_ENV` | Environment mode (`development` or `production`) | `development` |
| `MONGO_URI` | MongoDB connection URI (local or MongoDB Atlas) | `mongodb://127.0.0.1:27017/mern_auth_db` |
| `JWT_SECRET` | Secret key for signing and verifying JSON Web Tokens | `super_secret_jwt_key_replace_this_in_production_xyz987` |
| `JWT_EXPIRE` | Expiration time for generated JWT tokens | `30d` |
| `CLIENT_URL` | Frontend client origin for CORS whitelist | `http://localhost:5173` |

### Client (`client/.env` / `client/.env.example`)

| Variable | Description | Default |
| :--- | :--- | :--- |
| `VITE_API_URL` | Base backend API endpoint URL | `http://localhost:5000/api` |

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v25)
- **MongoDB** running locally (`mongodb://127.0.0.1:27017`) or a free [MongoDB Atlas cluster URI](https://cloud.mongodb.com/).

### 2. Install Dependencies
You can install dependencies for both the server and client with one command:
```bash
npm run install:all
```
Or individually:
```bash
# Server
cd server
npm install

# Client
cd ../client
npm install
```

### 3. Configure `.env`
Make sure both `server/.env` and `client/.env` exist (pre-configured templates are included):
```bash
# In /server
cp .env.example .env

# In /client
cp .env.example .env
```

### 4. Running the Project

Open two terminal tabs:

**Terminal 1 (Backend Server):**
```bash
cd server
npm run dev
```
*The Express server runs on `http://localhost:5000`.*

**Terminal 2 (Frontend Client):**
```bash
cd client
npm run dev
```
*The Vite React client will run on `http://localhost:5173`.*

Alternatively, from the project root:
```bash
# Run server
npm run server

# Run client
npm run client
```

---

## 🔒 API Endpoints

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Public | Server uptime and health status |
| `POST` | `/api/auth/register` | Public | Register new user with name, email & password |
| `POST` | `/api/auth/login` | Public | Authenticate user credentials & receive JWT token |
| `GET` | `/api/auth/me` | **Private** | Fetch logged-in user profile (Requires `Bearer <token>`) |

### Example Request Headers for Protected Endpoints:
```http
Authorization: Bearer <your_jwt_token_here>
```

---

## 🛡️ Security Features
- **Bcrypt Password Hashing**: Passwords are automatically hashed via Mongoose pre-save hook with 10 salt rounds before being persisted.
- **Hidden Password Field**: `password` is marked with `select: false` so it is never accidentally leaked in queries.
- **Stateless JWT**: Standard RFC 7519 Bearer tokens with configurable expiration.
- **Protected Route Guards**: React Router protected routes redirect unauthorized users to login while saving the attempted destination.
- **Axios Interceptors**: Automatically injects `Authorization: Bearer <token>` into outgoing requests and clears stale tokens on 401 Unauthorized responses.
