# 📦 راهنمای نصب و راه‌اندازی Belook

## پیش‌نیازها

قبل از شروع، مطمئن شوید موارد زیر را نصب کرده‌اید:

- **Node.js** 18.0 یا بالاتر
- **npm** 9.0 یا بالاتر
- **PostgreSQL** 14 یا بالاتر

## مراحل نصب

### 1. نصب وابستگی‌ها

```bash
npm install
```

این دستور تمام کتابخانه‌های مورد نیاز را نصب می‌کند.

### 2. تنظیم متغیرهای محیطی

فایل `.env.example` را کپی کرده و نام آن را به `.env` تغییر دهید:

```bash
copy .env.example .env
```

سپس فایل `.env` را ویرایش کنید:

```env
# Database - آدرس پایگاه داده PostgreSQL خود را وارد کنید
DATABASE_URL="postgresql://username:password@localhost:5432/belook"

# NextAuth - یک رشته تصادفی امن برای NEXTAUTH_SECRET ایجاد کنید
NEXTAUTH_SECRET="your-super-secret-key-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"

# سایر تنظیمات (اختیاری)
ZARINPAL_MERCHANT_ID=""
SMSIR_API_KEY=""
```

**نکته مهم:** برای تولید `NEXTAUTH_SECRET` می‌توانید از دستور زیر استفاده کنید:

```bash
openssl rand -base64 32
یا
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

### 3. راه‌اندازی پایگاه داده

ابتدا یک دیتابیس PostgreSQL ایجاد کنید:

```sql
CREATE DATABASE belook;
```

سپس اسکیمای دیتابیس را ایجاد کنید:

```bash
npm run db:push
```

### 4. اجرای Seed (داده‌های اولیه)

برای ایجاد داده‌های نمونه (کاربر ادمین، دسته‌بندی‌ها، محصولات):

```bash
npm run db:seed
```

این دستور موارد زیر را ایجاد می‌کند:
- کاربر ادمین با اطلاعات زیر:
  - ایمیل: `admin@belook.ir`
  - رمز عبور: `admin123`
- دسته‌بندی‌های محصولات
- برندهای نمونه
- چند محصول نمونه

**⚠️ مهم:** حتماً پس از نصب، رمز عبور ادمین را تغییر دهید!

### 5. اجرای پروژه

#### حالت توسعه (Development)

```bash
npm run dev
```

وب‌سایت در آدرس [http://localhost:3000](http://localhost:3000) اجرا خواهد شد.

#### حالت تولید (Production)

```bash
npm run build
npm start
```

## ساختار URL ها

پروژه از سیستم چند زبانه استفاده می‌کند. URL ها به صورت زیر هستند:

- فارسی: `http://localhost:3000/fa`
- عربی: `http://localhost:3000/ar`
- انگلیسی: `http://localhost:3000/en`

زبان پیش‌فرض **فارسی** است.

## دستورات مفید

### مدیریت دیتابیس

```bash
# مشاهده و ویرایش دیتابیس با Prisma Studio
npm run db:studio

# به‌روزرسانی اسکیمای دیتابیس
npm run db:push

# اجرای Seed مجدد
npm run db:seed
```

### توسعه

```bash
# اجرای در حالت Development
npm run dev

# بررسی Lint
npm run lint

# Build پروژه
npm run build
```

## دسترسی به پنل ادمین

پس از راه‌اندازی، با اطلاعات زیر وارد پنل ادمین شوید:

- آدرس: `http://localhost:3000/fa/admin`
- ایمیل: `admin@belook.ir`
- رمز عبور: `admin123`

## پیکربندی برای Production

### 1. امنیت

- حتماً `NEXTAUTH_SECRET` را با یک مقدار تصادفی قوی تغییر دهید
- رمز عبور کاربر ادمین را تغییر دهید
- SSL را فعال کنید

### 2. دیتابیس

- از یک سرویس PostgreSQL قابل اعتماد استفاده کنید
- Backup منظم از دیتابیس بگیرید
- Connection pooling را فعال کنید

### 3. متغیرهای محیطی

در production حتماً موارد زیر را تنظیم کنید:

```env
NODE_ENV=production
DATABASE_URL="your-production-database-url"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-strong-secret-key"
```

### 4. بهینه‌سازی

- تصاویر را در CDN قرار دهید
- Cache را به درستی پیکربندی کنید
- از compression استفاده کنید

## مشکلات رایج

### خطای اتصال به دیتابیس

اگر با خطای اتصال به دیتابیس مواجه شدید:

1. مطمئن شوید PostgreSQL در حال اجرا است
2. اطلاعات `DATABASE_URL` را بررسی کنید
3. دسترسی‌های دیتابیس را چک کنید

### خطای NEXTAUTH_SECRET

اگر خطای مربوط به `NEXTAUTH_SECRET` دریافت کردید:

1. مطمئن شوید فایل `.env` وجود دارد
2. `NEXTAUTH_SECRET` را تنظیم کرده‌اید
3. سرور را restart کنید

### خطای Prisma

اگر با خطای Prisma مواجه شدید:

```bash
# Prisma Client را دوباره generate کنید
npx prisma generate

# اسکیما را دوباره push کنید
npm run db:push
```

## پشتیبانی

برای سوالات و مشکلات:

- ایمیل: info@belook.ir
- تلفن: 021-12345678

## مجوز

این پروژه تحت مجوز خصوصی است. تمام حقوق محفوظ است.

---

**موفق باشید! 🎉**
