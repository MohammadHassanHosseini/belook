# 🔧 راهنمای رفع مشکلات - Belook

## مشکلات رایج و راه‌حل‌ها

### 1. خطای دیتابیس

#### خطا: `P1000: Authentication failed`
```
prisma: error: P1000: Authentication failed against database server
```

**راه‌حل:**
1. مطمئن شوید PostgreSQL در حال اجرا است
2. اطلاعات `DATABASE_URL` در فایل `.env` را بررسی کنید
3. نام کاربری و رمز عبور را صحیح وارد کرده‌اید

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/belook"
```

#### خطا: `database "belook" does not exist`

**راه‌حل:**
دیتابیس را ایجاد کنید:
```sql
CREATE DATABASE belook;
```

سپس migration ها را اجرا کنید:
```bash
npm run db:push
npm run db:seed
```

---

### 2. خطاهای next-intl

#### خطا: `MISSING_MESSAGE`

**راه‌حل:**
1. فایل‌های ترجمه را بررسی کنید: `src/messages/fa.json`, `en.json`, `ar.json`
2. مطمئن شوید کلید مورد نظر در فایل ترجمه وجود دارد
3. سرور را restart کنید

---

### 3. خطاهای فونت

#### خطا: `404 - fonts/Vazirmatn-*.woff2`

**راه‌حل:**
فونت‌ها از Google Fonts CDN لود می‌شوند. اگر اینترنت دارید، مشکل خودکار حل می‌شود.

برای لود محلی:
1. فایل‌های فونت را در `public/fonts/` قرار دهید
2. `globals.css` را برای استفاده از فونت‌های لوکال تنظیم کنید

---

### 4. مشکلات نصب

#### خطا: PowerShell Execution Policy

**راه‌حل:**
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

#### خطا: `Cannot find module`

**راه‌حل:**
```bash
# پاک کردن node_modules و نصب مجدد
Remove-Item -Recurse -Force node_modules
npm install
```

---

### 5. مشکلات Build

#### خطا: Build Failed

**راه‌حل:**
1. TypeScript errors را بررسی کنید:
```bash
npm run type-check
```

2. Lint errors را رفع کنید:
```bash
npm run lint
```

3. Cache را پاک کنید:
```bash
Remove-Item -Recurse -Force .next
npm run build
```

---

### 6. مشکلات API

#### خطا: `500 Internal Server Error`

**راه‌حل:**
1. لاگ‌های server را بررسی کنید
2. مطمئن شوید Prisma Client تولید شده:
```bash
npx prisma generate
```

3. اتصال دیتابیس را تست کنید:
```bash
npx prisma db push
```

---

### 7. مشکلات Authentication

#### مشکل: نمی‌توانم وارد پنل ادمین شوم

**راه‌حل:**
1. مطمئن شوید `NEXTAUTH_SECRET` در `.env` تنظیم شده
2. مطمئن شوید seed اجرا شده و کاربر admin ایجاد شده:
```bash
npm run db:seed
```

اطلاعات ورود پیش‌فرض:
- ایمیل: `admin@belook.ir`
- رمز: `admin123`

---

### 8. مشکلات Performance

#### سایت کند است

**راه‌حل:**
1. Production build بسازید:
```bash
npm run build
npm start
```

2. تصاویر را بهینه کنید (استفاده از WebP/AVIF)
3. Cache browser را پاک کنید
4. DevTools را باز نکنید (در development mode کند می‌کند)

---

### 9. مشکلات Styling

#### Tailwind classes کار نمی‌کند

**راه‌حل:**
1. مطمئن شوید `tailwind.config.ts` صحیح است
2. `globals.css` را import کرده‌اید
3. سرور را restart کنید

---

### 10. مشکلات هاتگذاری

#### تغییرات اعمال نمی‌شود

**راه‌حل:**
1. Hard Refresh: `Ctrl + Shift + R`
2. Clear Browser Cache
3. Restart Development Server
4. پاک کردن `.next` folder:
```bash
Remove-Item -Recurse -Force .next
npm run dev
```

---

## 📞 دریافت کمک

اگر مشکل شما حل نشد:

1. **مستندات را بررسی کنید**: `INSTALL.md`, `README.md`
2. **Issues GitHub** را چک کنید
3. **با تیم تماس بگیرید**: info@belook.ir

---

## 🔍 دستورات مفید برای Debug

```bash
# بررسی وضعیت دیتابیس
npx prisma studio

# مشاهده اسکیمای دیتابیس
npx prisma db pull

# بررسی TypeScript
npm run type-check

# بررسی Lint
npm run lint

# مشاهده build errors
npm run build

# تست production locally
npm run build && npm start
```

---

**نکته**: همیشه قبل از شروع debug، مطمئن شوید که از آخرین نسخه کد استفاده می‌کنید و `npm install` را اجرا کرده‌اید.
