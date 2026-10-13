# Real Estate Website

A minimal full-stack real-estate starter: React + Vite client, Node + Express server,
MongoDB + Mongoose, and Leaflet maps.

## Structure

```
.
├── client/                 # React + Vite frontend
│   └── src/
│       ├── pages/          # Home, Login, Register, PropertyList, PropertyDetail,
│       │                   # Favorites, AgentDashboard, Profile
│       ├── components/     # Navbar, PropertyCard, SearchFilters, ImageGallery,
│       │                   # MapView, InquiryForm
│       └── services/       # api.js (axios), auth.js, properties.js
└── server/                 # Node + Express API
    ├── config/db.js        # Mongoose connection
    ├── models/             # User, Property, Inquiry
    ├── routes/             # auth, properties, inquiries, favorites
    ├── controllers/        # CRUD handlers
    ├── middleware/         # auth, errorHandler
    └── uploads/            # Uploaded images
```

## Prerequisites

- Node.js 18+
- MongoDB running locally (or a MongoDB Atlas connection string)

## Setup

### 1. Server

```bash
cd server
npm install
cp .env.example .env   # then edit values if needed
npm run dev
```

The API runs on `http://localhost:5000`.

### 2. Client

```bash
cd client
npm install
cp .env.example .env   # then edit values if needed
npm run dev
```

The app runs on `http://localhost:5173`.

## Environment Variables

**server/.env**

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/real_estate
JWT_SECRET=change_me
CLIENT_URL=http://localhost:5173
```

**client/.env**

```
VITE_API_URL=http://localhost:5000/api
```

## Available Scripts

| Location | Command         | Description              |
| -------- | --------------- | ------------------------ |
| server   | `npm run dev`   | Start API with nodemon   |
| server   | `npm start`     | Start API                |
| client   | `npm run dev`   | Start Vite dev server    |
| client   | `npm run build` | Build for production     |

## Notes

This is a scaffold. Controllers contain minimal placeholder CRUD logic intended to be
fleshed out.
