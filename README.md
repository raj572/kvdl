# KVDL Real Estate - Setup Guide

## Backend Setup

1. **Configure Database:**
   - Create MySQL database: `kvdl_real_estate`
   - Copy `.env.example` to `.env` in backend folder
   - Update database credentials in `.env`:
     ```
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=kvdl_real_estate
     DB_USERNAME=root
     DB_PASSWORD=your_password
     ```

2. **Install & Run:**
   ```bash
   cd backend
   composer install
   php artisan key:generate
   php artisan migrate
   php artisan serve
   ```

## Frontend Setup

1. **Configure API URL:**
   - `.env` file already created with: `VITE_API_BASE_URL=http://localhost:8000`

2. **Install & Run:**
   ```bash
   cd app
   npm install
   npm run dev
   ```

## Access
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api

## API Endpoints
- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Get all contacts
