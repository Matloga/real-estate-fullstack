# Real Estate Full-Stack (MongoDB + Mongoose + Leaflet)

## Tech Stack
- Frontend: React + Vite + React Router + Axios + Leaflet + React Leaflet
- Backend: Node.js + Express + Mongoose + JWT + bcryptjs + multer + CORS
- Database: MongoDB (local or Atlas)
- Maps: Leaflet (OpenStreetMap)

## Project Structure
real-estate/
- client/ (React frontend)
- server/ (Express backend)
- README.md

## Quick Start

### 1) Server setup
```bash
cd real-estate/server
npm install
cp ../.env.example .env  # or create .env with PORT,MONGO_URI,JWT_SECRET,CLIENT_URL
npm run dev
```

### 2) Client setup
```bash
cd real-estate/client
npm install
npm run dev
```

## Features Implemented (scaffold)
- User auth (register/login/me) with JWT
- Property CRUD (agents only for create/update/delete), image upload
- Advanced search/filters + pagination
- Property details with image gallery + Leaflet map
- Favorites routes (basic)
- Inquiries (create, list, update status)
- Nearby search via 2dsphere index
- Responsive base styles

## API Routes (overview)
- POST/GET /api/auth/*
- GET/POST/PUT/DELETE /api/properties, GET /api/properties/:id, GET /api/properties/nearby/search
- POST/GET/PATCH /api/inquiries
- GET/POST/DELETE /api/favorites

## Notes
- Update .env in server: MONGO_URI, JWT_SECRET, CLIENT_URL, PORT
- Vite proxies /api to server (see client/vite.config.js)
- Uploads served from /uploads
