# 🚀 راهنمای استقرار (Deployment)

این راهنما مراحل استقرار فروشگاه Belook در محیط Production را توضیح می‌دهد.

## گزینه‌های استقرار

### 1. Vercel (توصیه شده)

بهترین و آسان‌ترین روش برای استقرار Next.js:

```bash
# نصب Vercel CLI
npm i -g vercel

# استقرار
vercel

# یا با دستور زیر برای production
vercel --prod
```

**تنظیمات محیطی در Vercel:**
1. وارد dashboard.vercel.com شوید
2. پروژه را انتخاب کنید
3. Settings → Environment Variables
4. متغیرهای زیر را اضافه کنید:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`

### 2. سرور خصوصی (VPS)

#### پیش‌نیازها
- Node.js 18+
- PostgreSQL 14+
- PM2 (برای مدیریت process)
- Nginx (برای reverse proxy)

#### مراحل:

1. **آماده‌سازی سرور**
```bash
# به‌روزرسانی سیستم
sudo apt update && sudo apt upgrade -y

# نصب Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# نصب PM2
sudo npm install -g pm2

# نصب PostgreSQL
sudo apt install postgresql postgresql-contrib
```

2. **کلون کردن پروژه**
```bash
git clone <repository-url> /var/www/belook
cd /var/www/belook
```

3. **نصب و Build**
```bash
npm install
npm run build
```

4. **تنظیم متغیرهای محیطی**
```bash
# ایجاد فایل .env
nano .env

# محتوای فایل:
DATABASE_URL="postgresql://user:pass@localhost:5432/belook"
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://yourdomain.com"
NODE_ENV="production"
```

5. **راه‌اندازی با PM2**
```bash
pm2 start npm --name "belook" -- start
pm2 save
pm2 startup
```

6. **پیکربندی Nginx**
```nginx
server {
    listen 80;
    server_name belook.ir www.belook.ir;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# فعال‌سازی تنظیمات
sudo ln -s /etc/nginx/sites-available/belook /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

7. **نصب SSL با Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d belook.ir -d www.belook.ir
```

### 3. Docker

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/belook
      - NEXTAUTH_SECRET=your-secret
    depends_on:
      - db
  
  db:
    image: postgres:14
    environment:
      - POSTGRES_DB=belook
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

```bash
# اجرا
docker-compose up -d
```

## چک‌لیست قبل از استقرار

- [ ] تمام تست‌ها را اجرا کنید
- [ ] متغیرهای محیطی را بررسی کنید
- [ ] `NEXTAUTH_SECRET` را تغییر دهید
- [ ] رمز عبور ادمین را تغییر دهید
- [ ] SSL را فعال کنید
- [ ] Backup از دیتابیس بگیرید
- [ ] نظارت و Logging را راه‌اندازی کنید
- [ ] CDN برای تصاویر تنظیم کنید

## بهینه‌سازی‌های Production

### 1. تصاویر
- از CDN استفاده کنید (Cloudflare, AWS CloudFront)
- تصاویر را optimize کنید
- از WebP استفاده کنید

### 2. کش
```nginx
# کش فایل‌های استاتیک در Nginx
location /_next/static {
    alias /var/www/belook/.next/static;
    expires 1y;
    access_log off;
}
```

### 3. Database
- Connection pooling را فعال کنید
- Indexes مناسب اضافه کنید
- Backup خودکار تنظیم کنید

### 4. Monitoring
```bash
# نصب Monitoring tools
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

## به‌روزرسانی

```bash
# Pull آخرین تغییرات
git pull origin main

# نصب dependencies جدید
npm install

# Build مجدد
npm run build

# Restart
pm2 restart belook
```

## Rollback

```bash
# بازگشت به نسخه قبلی
git checkout <previous-commit-hash>
npm install
npm run build
pm2 restart belook
```

## مانیتورینگ و لاگ‌ها

```bash
# مشاهده لاگ‌ها
pm2 logs belook

# وضعیت
pm2 status

# مانیتور
pm2 monit
```

## Backup

### دیتابیس
```bash
# Backup
pg_dump -U postgres belook > backup_$(date +%Y%m%d).sql

# Restore
psql -U postgres belook < backup_20231031.sql
```

### فایل‌ها
```bash
# Backup تصاویر
tar -czf uploads_$(date +%Y%m%d).tar.gz public/uploads
```

## پشتیبانی

در صورت بروز مشکل:
- Email: info@belook.ir
- تلفن: 021-12345678

---

**موفق باشید! 🚀**
