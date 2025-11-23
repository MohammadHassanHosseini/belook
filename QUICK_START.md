# 🚀 راهنمای سریع شروع کار

## مراحل نصب و راه‌اندازی (5 دقیقه)

### 1️⃣ نصب وابستگی‌ها
```bash
npm install
```

### 2️⃣ تنظیم دیتابیس

**الف) نصب PostgreSQL**
- از [postgresql.org](https://postgresql.org/download) نصب کنید
- یا با Docker:
```bash
docker run --name belook-postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:14
```

**ب) ایجاد دیتابیس**
```sql
CREATE DATABASE belook;
```

### 3️⃣ تنظیم Environment Variables

```bash
# کپی فایل نمونه
copy .env.example .env
```

**ویرایش `.env`:**
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/belook"
NEXTAUTH_SECRET="belook-super-secret-key-2024-change-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

### 4️⃣ راه‌اندازی دیتابیس
```bash
# ایجاد جداول
npm run db:push

# اضافه کردن داده‌های نمونه
npm run db:seed
```

### 5️⃣ اجرای پروژه
```bash
npm run dev
```

✅ **وب‌سایت در آدرس زیر اجرا شد:**
- صفحه اصلی: http://localhost:3000/fa
- پنل ادمین: http://localhost:3000/fa/admin

---

## 🔐 اطلاعات ورود ادمین

```
ایمیل: admin@belook.ir
رمز عبور: admin123
```

**⚠️ حتماً بعد از ورود اول، رمز عبور را تغییر دهید!**

---

## 📁 ساختار مهم پروژه

```
belook/
├── src/
│   ├── app/
│   │   ├── [locale]/          # صفحات چند زبانه
│   │   │   ├── page.tsx       # صفحه اصلی ✓
│   │   │   ├── products/      # لیست و جزئیات محصولات ✓
│   │   │   ├── cart/          # سبد خرید ✓
│   │   │   ├── checkout/      # فرآیند خرید ✓
│   │   │   ├── admin/         # پنل ادمین ✓
│   │   │   ├── about/         # درباره ما ✓
│   │   │   ├── contact/       # تماس با ما ✓
│   │   │   └── auth/          # ورود و ثبت‌نام ✓
│   │   └── api/               # API Routes
│   │       ├── auth/          # احراز هویت ✓
│   │       ├── products/      # محصولات ✓
│   │       ├── cart/          # سبد خرید ✓
│   │       └── categories/    # دسته‌بندی‌ها ✓
│   ├── components/
│   │   ├── ui/                # کامپوننت‌های پایه ✓
│   │   ├── layout/            # Header & Footer ✓
│   │   ├── home/              # صفحه اصلی ✓
│   │   ├── product/           # محصولات ✓
│   │   └── admin/             # پنل ادمین ✓
│   ├── lib/                   # توابع کمکی ✓
│   ├── store/                 # State management ✓
│   └── messages/              # فایل‌های ترجمه (fa, ar, en) ✓
└── prisma/
    ├── schema.prisma          # اسکیمای دیتابیس ✓
    └── seed.ts                # داده‌های نمونه ✓
```

---

## ✨ ویژگی‌های پیاده‌سازی شده

### 🎨 UI/UX
- ✅ طراحی مدرن و زیبا
- ✅ Responsive (موبایل، تبلت، دسکتاپ)
- ✅ انیمیشن‌های روان
- ✅ Dark Mode Ready

### 🌍 چند زبانه
- ✅ فارسی (پیش‌فرض)
- ✅ عربی
- ✅ انگلیسی
- ✅ پشتیبانی کامل RTL/LTR

### 🛍️ فروشگاه
- ✅ صفحه اصلی با Hero و Features
- ✅ لیست محصولات با فیلتر و جستجو
- ✅ صفحه جزئیات محصول
- ✅ سبد خرید
- ✅ لیست علاقه‌مندی‌ها
- ✅ فرآیند Checkout کامل

### 👨‍💼 پنل ادمین
- ✅ Dashboard با آمار
- ✅ مدیریت محصولات
- ✅ مدیریت سفارشات
- ✅ مدیریت کاربران
- ✅ مدیریت دسته‌بندی‌ها و برندها

### 🔐 امنیت
- ✅ احراز هویت با NextAuth.js
- ✅ رمزنگاری رمز عبور
- ✅ Security Headers
- ✅ محافظت در برابر حملات

### 📊 API
- ✅ RESTful API
- ✅ Authentication
- ✅ CRUD عملیات
- ✅ Error Handling

### 🚀 SEO & Performance
- ✅ Sitemap
- ✅ Robots.txt
- ✅ Web Manifest (PWA)
- ✅ Meta Tags
- ✅ Image Optimization

---

## 🎯 دستورات مفید

```bash
# اجرا در حالت Development
npm run dev

# Build برای Production
npm run build

# اجرای Production
npm start

# بررسی Lint
npm run lint

# مشاهده دیتابیس
npm run db:studio

# به‌روزرسانی اسکیما
npm run db:push

# اجرای Seed مجدد
npm run db:seed
```

---

## 🌐 URL های مهم

### کاربران
- صفحه اصلی (فارسی): `http://localhost:3000/fa`
- صفحه اصلی (عربی): `http://localhost:3000/ar`
- صفحه اصلی (انگلیسی): `http://localhost:3000/en`
- محصولات: `http://localhost:3000/fa/products`
- سبد خرید: `http://localhost:3000/fa/cart`
- تسویه حساب: `http://localhost:3000/fa/checkout`
- درباره ما: `http://localhost:3000/fa/about`
- تماس با ما: `http://localhost:3000/fa/contact`

### ادمین
- پنل ادمین: `http://localhost:3000/fa/admin`
- ورود: `http://localhost:3000/fa/auth/login`

### توسعه‌دهنده
- API Health: `http://localhost:3000/api/health`
- Prisma Studio: `http://localhost:5555` (با دستور `npm run db:studio`)

---

## 📝 چک‌لیست بعد از نصب

- [ ] پروژه با `npm run dev` اجرا شد
- [ ] صفحه اصلی باز می‌شود
- [ ] با حساب ادمین وارد شدید
- [ ] رمز عبور ادمین را تغییر دادید
- [ ] داده‌های نمونه نمایش داده می‌شوند
- [ ] تغییر زبان کار می‌کند
- [ ] سبد خرید عمل می‌کند

---

## 🆘 رفع مشکلات رایج

### خطای اتصال به دیتابیس
```bash
# بررسی کنید PostgreSQL در حال اجرا است
# Windows:
services.msc # و سرویس postgresql را چک کنید

# یا با Docker:
docker ps # باید کانتینر postgres را ببینید
```

### خطای Prisma
```bash
npx prisma generate
npm run db:push
```

### پورت 3000 استفاده است
```bash
# تغییر پورت:
npm run dev -- -p 3001
```

### خطای NEXTAUTH_SECRET
- مطمئن شوید فایل `.env` وجود دارد
- `NEXTAUTH_SECRET` را تنظیم کرده‌اید
- سرور را restart کنید

---

## 📚 مستندات بیشتر

- [INSTALL.md](./INSTALL.md) - راهنمای نصب کامل
- [FEATURES.md](./FEATURES.md) - لیست کامل ویژگی‌ها
- [DEPLOYMENT.md](./DEPLOYMENT.md) - راهنمای استقرار
- [CONTRIBUTING.md](./CONTRIBUTING.md) - راهنمای مشارکت
- [README.md](./README.md) - توضیحات کلی پروژه

---

## 💡 نکات مهم

1. **امنیت**: در production حتماً تمام secrets را تغییر دهید
2. **Backup**: از دیتابیس backup منظم بگیرید
3. **Update**: به‌طور منظم dependencies را به‌روزرسانی کنید
4. **Monitoring**: سیستم monitoring راه‌اندازی کنید
5. **Testing**: قبل از deploy تست کنید

---

## 🎓 آموزش‌های مفید

### اضافه کردن محصول جدید
1. وارد پنل ادمین شوید
2. بخش محصولات → افزودن محصول
3. اطلاعات را پر کنید
4. ذخیره

### تغییر تنظیمات سایت
1. پنل ادمین → تنظیمات
2. تنظیمات مورد نظر را تغییر دهید
3. ذخیره

### اضافه کردن زبان جدید
1. فایل ترجمه جدید در `src/messages/` بسازید
2. در `src/i18n.ts` زبان را اضافه کنید
3. در middleware تنظیم کنید

---

## 📞 پشتیبانی

- **ایمیل**: info@belook.ir
- **تلفن**: 021-12345678

---

## 🎉 موفق باشید!

حالا می‌توانید شروع به توسعه و سفارشی‌سازی کنید!

**نکته**: اگر سوالی دارید یا به مشکلی برخوردید، حتماً مستندات را مطالعه کنید یا با تیم پشتیبانی تماس بگیرید.
