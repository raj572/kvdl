# KVDL Application - Deployment Guide

## Environment Configuration

This application has separate environment configurations for **development** and **production**.

---

## Frontend (React + Vite)

### Development
Use `app/.env` for local development:
```env
VITE_API_BASE_URL=http://localhost:8000
```

### Production
Use `app/.env.production` for production deployment:
```env
VITE_API_BASE_URL=https://yourdomain.com
```

**To deploy frontend:**
1. Update `app/.env.production` with your production domain
2. Build the application:
   ```bash
   cd app
   npm run build
   ```
3. Deploy the `dist` folder to your web server

---

## Backend (Laravel)

### Development
Use `backend/.env` for local development (already configured)

### Production
Use `backend/.env.production` as a template:

1. **Copy the production template:**
   ```bash
   cd backend
   cp .env.production .env
   ```

2. **Update the following values in `.env`:**

   **Application:**
   - `APP_URL=https://yourdomain.com`
   - `APP_DEBUG=false` (IMPORTANT: Never set to true in production)
   - `APP_ENV=production`

   **Database:**
   - `DB_HOST=` (your database host)
   - `DB_DATABASE=` (your database name)
   - `DB_USERNAME=` (your database user)
   - `DB_PASSWORD=` (your database password)

   **Admin Credentials:**
   - `ADMIN_EMAIL=` (your admin email)
   - `ADMIN_PASSWORD=` (strong password)

   **Mail Server:**
   - `MAIL_HOST=` (your SMTP host)
   - `MAIL_USERNAME=` (your email)
   - `MAIL_PASSWORD=` (your email password)
   - `MAIL_FROM_ADDRESS=` (sender email)

   **Session Domain:**
   - `SESSION_DOMAIN=.yourdomain.com`

3. **Generate a new APP_KEY:**
   ```bash
   php artisan key:generate
   ```

4. **Run migrations:**
   ```bash
   php artisan migrate --force
   ```

5. **Optimize for production:**
   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

---

## Important Security Notes

### ⚠️ Production Checklist

- [ ] Set `APP_DEBUG=false` in backend `.env`
- [ ] Set `APP_ENV=production` in backend `.env`
- [ ] Generate new `APP_KEY` with `php artisan key:generate`
- [ ] Use strong database password
- [ ] Use strong admin password
- [ ] Configure proper mail server (not 'log')
- [ ] Set correct `SESSION_DOMAIN`
- [ ] Enable HTTPS (SSL certificate)
- [ ] Configure CORS properly
- [ ] Set up proper file permissions (storage and bootstrap/cache writable)
- [ ] Add `.env` to `.gitignore` (already done)

### File Permissions (Linux/Unix)
```bash
chmod -R 755 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

---

## Deployment Steps Summary

### 1. Frontend Deployment
```bash
cd app
# Update .env.production with your domain
npm install
npm run build
# Upload 'dist' folder to your web server
```

### 2. Backend Deployment
```bash
cd backend
# Copy and configure .env from .env.production
cp .env.production .env
# Edit .env with your production values
composer install --optimize-autoloader --no-dev
php artisan key:generate
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
# Set proper permissions
chmod -R 755 storage bootstrap/cache
```

### 3. Web Server Configuration

**For Apache (.htaccess already configured):**
- Point document root to `backend/public`
- Enable mod_rewrite

**For Nginx:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/backend/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

---

## Environment Variables Reference

### Frontend (.env / .env.production)
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `https://api.yourdomain.com` |

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `APP_URL` | Application URL | `https://yourdomain.com` |
| `APP_ENV` | Environment | `production` |
| `APP_DEBUG` | Debug mode | `false` |
| `DB_HOST` | Database host | `127.0.0.1` |
| `DB_DATABASE` | Database name | `kvdl_production` |
| `DB_USERNAME` | Database user | `kvdl_user` |
| `DB_PASSWORD` | Database password | `secure_password` |
| `MAIL_HOST` | SMTP host | `smtp.gmail.com` |
| `FRONTEND_URL` | Frontend URL for CORS | `https://yourdomain.com` |

---

## Testing Production Build Locally

### Frontend
```bash
cd app
npm run build
npm run preview
```

### Backend
```bash
cd backend
php artisan serve --env=production
```

---

## Troubleshooting

### Issue: 500 Internal Server Error
- Check `storage/logs/laravel.log`
- Ensure storage and cache directories are writable
- Run `php artisan config:clear`

### Issue: CORS Errors
- Update `config/cors.php` with your frontend URL
- Ensure `FRONTEND_URL` is set in `.env`

### Issue: Images Not Loading
- Check file permissions on `storage` directory
- Ensure `APP_URL` is correct in `.env`
- Run `php artisan storage:link`

---

## Support

For deployment assistance, refer to:
- [Laravel Deployment Documentation](https://laravel.com/docs/deployment)
- [Vite Build Documentation](https://vitejs.dev/guide/build.html)
