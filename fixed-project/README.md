# 🍕 Slices Pizzeria — MongoDB Edition

A full-stack pizza ordering web application built with **React + Vite** (frontend) and **Node.js + Express + MongoDB** (backend). Firebase and all temporary/cloud databases have been fully removed.

---

## ✅ What Was Changed

| Before (Firebase) | After (MongoDB) |
|---|---|
| Firebase Auth | JWT-based auth (bcrypt hashed passwords) |
| Firestore `users` collection | MongoDB `users` collection |
| Firestore `orders` collection | MongoDB `orders` collection |
| Firestore `admins` collection | MongoDB `users` with `role: "admin"` |
| `src/firebase/firebaseconfig.js` | `src/utils/api.js` (Axios + REST API) |
| `json-server` temp database | Full Express + Mongoose REST API |
| No admin dashboard | Admin Dashboard, Menu Manager, User Manager |

---

## 📁 Project Structure

```
slices-pizzeria-mongodb/
├── backend/                    ← Node.js + Express + MongoDB
│   ├── middleware/
│   │   └── auth.js             ← JWT protect + adminOnly middleware
│   ├── models/
│   │   ├── User.js             ← User model (role: user/admin)
│   │   ├── MenuItem.js         ← Menu item model
│   │   └── Order.js            ← Order model
│   ├── routes/
│   │   ├── auth.js             ← /api/auth/* (register, login, admin login)
│   │   ├── menu.js             ← /api/menu/* (CRUD, public read)
│   │   ├── orders.js           ← /api/orders/* (place, view, update status)
│   │   └── admin.js            ← /api/admin/* (dashboard, users)
│   ├── server.js               ← Express app entry point
│   ├── seed.js                 ← Seeds menu + creates default admin
│   ├── .env                    ← Environment variables
│   └── package.json
│
└── frontend/                   ← React + Vite
    ├── src/
    │   ├── admin/pages/
    │   │   ├── AdminLogin.jsx
    │   │   ├── AdminDashboard.jsx  ← NEW: stats, revenue, recent orders
    │   │   ├── Orders.jsx          ← Updated: live refresh, search, filter
    │   │   ├── AdminMenu.jsx       ← NEW: full CRUD for menu items
    │   │   └── AdminUsers.jsx      ← NEW: view/delete users
    │   ├── user/pages/
    │   │   ├── Login.jsx           ← JWT login
    │   │   ├── Register.jsx        ← MongoDB register
    │   │   ├── Home.jsx            ← Loads featured pizzas from DB
    │   │   ├── Menu.jsx            ← Fetches menu from API
    │   │   ├── MenuItem.jsx        ← Single item with quantity selector
    │   │   ├── Cart.jsx            ← Improved empty state + clear button
    │   │   ├── Checkout.jsx        ← Order summary sidebar
    │   │   ├── MyOrders.jsx        ← Polls API every 30s for live status
    │   │   ├── About.jsx
    │   │   └── Contact.jsx
    │   ├── components/
    │   │   ├── Header.jsx          ← No Firebase signOut
    │   │   ├── AdminHeader.jsx     ← Dashboard, Orders, Menu, Users links
    │   │   ├── PizzaCard.jsx       ← Uses MongoDB _id
    │   │   ├── NewsLetter.jsx      ← No Firebase
    │   │   ├── Footer.jsx
    │   │   └── Subheader.jsx
    │   ├── store/
    │   │   ├── user.js             ← Zustand + JWT token in localStorage
    │   │   ├── admin.js            ← Zustand + JWT token
    │   │   └── cart.js             ← Zustand persisted to localStorage
    │   └── utils/
    │       ├── api.js              ← Axios instance, all API calls
    │       └── messages.js         ← Toast notifications
    └── .env                        ← VITE_API_URL
```

---

## 🔧 Requirements

Make sure you have these installed:

| Tool | Version | Download |
|---|---|---|
| **Node.js** | v18+ | https://nodejs.org |
| **npm** | v9+ | Comes with Node.js |
| **MongoDB** | v6+ (local) | https://www.mongodb.com/try/download/community |

> **MongoDB Atlas (cloud)**: If you don't want to install MongoDB locally, you can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) for free. Create a cluster and get your connection string.

---

## 🚀 How to Run — Step by Step

### Step 1: Extract the project

Unzip `slices-pizzeria-mongodb.zip` to a folder of your choice.

```
slices-pizzeria-mongodb/
├── backend/
└── frontend/
```

---

### Step 2: Start MongoDB

**Option A — Local MongoDB:**
```bash
# macOS (Homebrew)
brew services start mongodb-community

# Windows — Start from Services or run:
net start MongoDB

# Linux
sudo systemctl start mongod
```

**Option B — MongoDB Atlas (cloud):**
1. Create free account at https://cloud.mongodb.com
2. Create a cluster → get connection string
3. Replace `MONGO_URI` in `backend/.env` with your Atlas URI

---

### Step 3: Setup the Backend

```bash
# Navigate to backend
cd slices-pizzeria-mongodb/backend

# Install dependencies
npm install

# (Optional) Edit environment variables
# Open .env and update if needed:
#   PORT=5000
#   MONGO_URI=mongodb://localhost:27017/slicespizzeria
#   JWT_SECRET=your_secret_key_here

# Seed the database (creates menu items + admin account)
npm run seed

# Start the backend server
npm run dev
```

✅ You should see:
```
✅ MongoDB connected successfully
🍕 Slices Pizzeria API running on http://localhost:5000
```

---

### Step 4: Setup the Frontend

Open a **new terminal**:

```bash
# Navigate to frontend
cd slices-pizzeria-mongodb/frontend

# Install dependencies
npm install

# Start the frontend dev server
npm run dev
```

✅ You should see:
```
  VITE v5.x.x  ready in xxx ms
  ➜  Local:   http://localhost:3301/
```

---

### Step 5: Open in Browser

- **Website**: http://localhost:3301
- **Admin Panel**: http://localhost:3301/adminlogin

---

## 🔐 Default Credentials

### Admin Login
| Field | Value |
|---|---|
| Email | `admin@slicespizzeria.com` |
| Password | `admin123` |

> ⚠️ **Change this password** before deploying to production!

### User Registration
Go to http://localhost:3301/register and create your own account.

---

## 🎛️ Admin Panel Features

After logging in as admin, you have access to:

| Page | URL | Description |
|---|---|---|
| Dashboard | `/admindashboard` | Stats: users, orders, revenue, unread messages, recent orders |
| Orders | `/adminorders` | View all orders, filter by status, update status live |
| Menu | `/adminmenu` | Add / Edit / Delete / Enable-Disable menu items |
| Users | `/adminusers` | View all registered users, delete accounts |
| Messages | `/adminmessages` | View contact form submissions, mark read, reply via email |

When admin **changes an order status**, it is immediately reflected in the customer's **My Orders** page (polls every 30 seconds).

Contact form submissions from the website are saved to MongoDB and appear in the **Messages** inbox with unread badge counts.

---

## 🌐 API Endpoints Reference

### Auth
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | User login → returns JWT |
| POST | `/api/auth/admin/login` | Public | Admin login → returns JWT |
| GET | `/api/auth/me` | User | Get current user profile |

### Menu
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/menu` | Public | Get all available items |
| GET | `/api/menu/all` | Admin | Get all items (including unavailable) |
| GET | `/api/menu/:id` | Public | Get single item |
| POST | `/api/menu` | Admin | Create new item |
| PUT | `/api/menu/:id` | Admin | Update item |
| DELETE | `/api/menu/:id` | Admin | Delete item |

### Orders
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/orders` | User | Place new order |
| GET | `/api/orders/my` | User | Get my orders |
| GET | `/api/orders` | Admin | Get all orders |
| GET | `/api/orders/stats` | Admin | Get order statistics |
| PATCH | `/api/orders/:id/status` | Admin | Update order status |

### Contact
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/contact` | Public | Submit contact message |
| GET | `/api/contact` | Admin | Get all messages |
| PATCH | `/api/contact/:id/read` | Admin | Mark message as read |
| DELETE | `/api/contact/:id` | Admin | Delete message |
|---|---|---|---|
| GET | `/api/admin/dashboard` | Admin | Dashboard stats |
| GET | `/api/admin/users` | Admin | Get all users |
| DELETE | `/api/admin/users/:id` | Admin | Delete a user |

---

## 🛠️ Production Build

```bash
# Build frontend for production
cd frontend
npm run build
# Output is in frontend/dist/

# Start backend in production
cd backend
NODE_ENV=production node server.js
```

---

## 📦 Dependencies

### Backend
- `express` — Web framework
- `mongoose` — MongoDB ODM
- `bcryptjs` — Password hashing
- `jsonwebtoken` — JWT authentication
- `cors` — Cross-origin requests
- `dotenv` — Environment variables

### Frontend
- `react` + `react-dom` — UI
- `react-router-dom` — Routing
- `zustand` + `immer` — State management
- `axios` — HTTP client
- `react-toastify` — Toast notifications
- `vite` — Build tool

---

## ❓ Troubleshooting

**"MongoDB connection error"**
→ Make sure MongoDB is running. Run `mongod` in terminal.

**"Cannot find module" errors**
→ Run `npm install` in both `backend/` and `frontend/` folders.

**"Admin login failed"**
→ Make sure you ran `npm run seed` in the backend first.

**Port already in use**
→ Change `PORT` in `backend/.env` or `--port` in `frontend/vite.config.js`.

**Menu not loading on frontend**
→ Make sure backend is running on port 5000. Check browser console for errors.
