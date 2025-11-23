# 🔐 راهنمای کامل سیستم احراز هویت فروشگاه بی لوک

## 📊 انواع کاربران و نقش‌ها

### 1️⃣ مشتری (CUSTOMER)
**نقش:** خرید و استفاده از فروشگاه آنلاین

**مسیر ورود:**
```
1. رفتن به: https://belook.com/fa/auth/login
2. وارد کردن ایمیل و رمز عبور
3. کلیک روی "ورود به پنل"
4. ✅ Redirect به: https://belook.com/fa (صفحه اصلی)
```

**دسترسی‌ها:**
- ✅ مشاهده و جستجوی محصولات
- ✅ افزودن به سبد خرید
- ✅ ثبت سفارش و پرداخت
- ✅ پیگیری سفارشات
- ✅ مدیریت پروفایل شخصی
- ✅ مدیریت آدرس‌ها
- ✅ ثبت نظر و امتیازدهی
- ✅ لیست علاقه‌مندی‌ها
- ❌ **دسترسی به /admin**

**پنل کاربری:**
```
/fa/profile           - پروفایل شخصی
/fa/profile/orders    - سفارشات من
/fa/profile/addresses - آدرس‌های من
/fa/profile/wishlist  - علاقه‌مندی‌ها
/fa/profile/reviews   - نظرات من
```

---

### 2️⃣ ادمین/پشتیبان (ADMIN)
**نقش:** مدیریت سفارشات، محتوا و پشتیبانی

**مسیر ورود:**
```
1. رفتن به: https://belook.com/fa/auth/login
2. وارد کردن ایمیل ادمین و رمز عبور
3. کلیک روی "ورود به پنل"
4. ✅ Redirect به: https://belook.com/fa/admin (پنل مدیریت)
5. 💬 Toast: "خوش آمدید ادمین عزیز!"
```

**دسترسی‌ها:**
- ✅ داشبورد مدیریت
- ✅ مشاهده سفارشات
- ✅ ویرایش وضعیت سفارشات
- ✅ مشاهده محصولات
- ✅ پاسخ به نظرات کاربران
- ✅ مدیریت تیکت‌های پشتیبانی
- ✅ مشاهده گزارش‌های پایه
- ✅ مدیریت اعلانات
- ⚠️ **ویرایش محدود محصولات**
- ❌ **افزودن/حذف محصولات**
- ❌ **مدیریت کاربران**
- ❌ **تنظیمات سیستم**
- ❌ **مدیریت دسته‌بندی‌ها و برندها**

**پنل مدیریت:**
```
/fa/admin                  - داشبورد
/fa/admin/orders           - مدیریت سفارشات ✅
/fa/admin/products         - مشاهده محصولات ✅
/fa/admin/reviews          - مدیریت نظرات ✅
/fa/admin/chat             - چت و پشتیبانی ✅
/fa/admin/reports          - گزارش‌ها ✅
/fa/admin/notifications    - اعلانات ✅

🚫 محدودیت‌ها:
/fa/admin/products/new     - ❌ ممنوع
/fa/admin/users            - ❌ ممنوع
/fa/admin/categories       - ❌ ممنوع
/fa/admin/settings         - ❌ ممنوع
```

---

### 3️⃣ سوپر ادمین (SUPER_ADMIN)
**نقش:** مدیر کل با دسترسی کامل

**مسیر ورود:**
```
1. رفتن به: https://belook.com/fa/auth/login
2. وارد کردن ایمیل سوپر ادمین و رمز عبور
3. کلیک روی "ورود به پنل"
4. ✅ Redirect به: https://belook.com/fa/admin (پنل مدیریت)
5. 💬 Toast: "خوش آمدید مدیر کل عزیز!"
```

**دسترسی‌ها:**
- ✅ **دسترسی کامل به همه بخش‌ها**
- ✅ مدیریت کامل محصولات (CRUD)
- ✅ مدیریت کاربران و نقش‌ها
- ✅ مدیریت دسته‌بندی‌ها و برندها
- ✅ تنظیمات سیستم
- ✅ مدیریت کوپن‌ها و تخفیف‌ها
- ✅ مدیریت خبرنامه
- ✅ گزارش‌های پیشرفته و آمارها
- ✅ تمام امکانات ADMIN
- ✅ مدیریت دسترسی‌ها

**پنل مدیریت (دسترسی کامل):**
```
/fa/admin                  - داشبورد
/fa/admin/products         - مدیریت محصولات ✅ (CRUD)
/fa/admin/products/new     - افزودن محصول ✅
/fa/admin/orders           - مدیریت سفارشات ✅
/fa/admin/users            - مدیریت کاربران ✅
/fa/admin/categories       - مدیریت دسته‌بندی‌ها ✅
/fa/admin/brands           - مدیریت برندها ✅
/fa/admin/reviews          - مدیریت نظرات ✅
/fa/admin/coupons          - مدیریت کوپن‌ها ✅
/fa/admin/newsletter       - خبرنامه ✅
/fa/admin/reports          - گزارش‌های پیشرفته ✅
/fa/admin/settings         - تنظیمات سیستم ✅
/fa/admin/chat             - چت و پشتیبانی ✅
```

---

## 🔄 فلوچارت ورود

```
                    ┌──────────────────┐
                    │  کاربر وارد     │
                    │  /auth/login    │
                    │   می‌شود         │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │  ایمیل و رمز    │
                    │  عبور وارد      │
                    │   می‌کند        │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │  Next-Auth      │
                    │  بررسی می‌کند   │
                    └────────┬─────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
        ┌───────▼────────┐       ┌───────▼────────┐
        │  ✅ صحیح       │       │  ❌ نادرست     │
        └───────┬────────┘       └───────┬────────┘
                │                         │
                │                 ┌───────▼────────┐
                │                 │  نمایش خطا     │
                │                 │  و باقی ماندن  │
                │                 │  در صفحه       │
                │                 └────────────────┘
                │
        ┌───────▼────────┐
        │  بررسی Role    │
        │  از Session    │
        └───────┬────────┘
                │
    ┌───────────┼───────────┐
    │           │           │
┌───▼───┐  ┌───▼────┐  ┌──▼──────┐
│CUSTOMER│  │ ADMIN  │  │SUPER_   │
│        │  │        │  │ADMIN    │
└───┬───┘  └───┬────┘  └──┬──────┘
    │          │           │
┌───▼───┐  ┌───▼────┐  ┌──▼──────┐
│ /fa   │  │ /admin │  │ /admin  │
│صفحه   │  │پنل با  │  │پنل با   │
│اصلی   │  │دسترسی │  │دسترسی   │
│       │  │محدود   │  │کامل     │
└───────┘  └────────┘  └─────────┘
```

---

## 🛡️ سیستم محافظت از Route ها

### استفاده در Server Components:

```typescript
// محافظت ساده - فقط ورود
import { requireAuth } from '@/lib/auth-helpers';

export default async function ProfilePage() {
  await requireAuth('fa'); // Redirect به login اگر وارد نشده
  
  return <div>محتوا</div>;
}
```

```typescript
// محافظت Admin
import { requireAdmin } from '@/lib/auth-helpers';

export default async function AdminPage() {
  await requireAdmin('fa'); // Redirect اگر ADMIN نباشد
  
  return <div>پنل ادمین</div>;
}
```

```typescript
// محافظت Super Admin
import { requireSuperAdmin } from '@/lib/auth-helpers';

export default async function UsersPage() {
  await requireSuperAdmin('fa'); // Redirect اگر SUPER_ADMIN نباشد
  
  return <div>مدیریت کاربران</div>;
}
```

### بررسی دسترسی‌ها:

```typescript
import { getPermissions } from '@/lib/auth-helpers';
import { getServerSession } from 'next-auth';

export default async function ProductsPage() {
  const session = await requireAdmin('fa');
  const userRole = (session.user as any).role;
  const permissions = getPermissions(userRole);
  
  return (
    <div>
      {permissions.canCreateProducts && (
        <Button>افزودن محصول جدید</Button>
      )}
      
      {permissions.canEditProducts && (
        <Button>ویرایش</Button>
      )}
    </div>
  );
}
```

---

## 📝 دسترسی‌های دقیق بر اساس Role

| عملیات | CUSTOMER | ADMIN | SUPER_ADMIN |
|--------|----------|-------|-------------|
| **محصولات** |
| مشاهده | ✅ | ✅ | ✅ |
| ایجاد | ❌ | ❌ | ✅ |
| ویرایش | ❌ | ⚠️ محدود | ✅ |
| حذف | ❌ | ❌ | ✅ |
| **سفارشات** |
| مشاهده خود | ✅ | ❌ | ❌ |
| مشاهده همه | ❌ | ✅ | ✅ |
| ویرایش | ❌ | ✅ | ✅ |
| لغو | ✅ (خود) | ✅ | ✅ |
| Refund | ❌ | ❌ | ✅ |
| **کاربران** |
| مشاهده | ❌ | ✅ | ✅ |
| ویرایش | ❌ | ❌ | ✅ |
| حذف | ❌ | ❌ | ✅ |
| تغییر نقش | ❌ | ❌ | ✅ |
| **دسته‌بندی‌ها** |
| مشاهده | ✅ | ✅ | ✅ |
| مدیریت | ❌ | ❌ | ✅ |
| **نظرات** |
| ثبت | ✅ | ✅ | ✅ |
| تایید | ❌ | ✅ | ✅ |
| حذف | ❌ | ✅ | ✅ |
| **تنظیمات** |
| مشاهده | ❌ | ✅ | ✅ |
| ویرایش | ❌ | ❌ | ✅ |

---

## 🔐 نمونه‌های کد

### 1. ایجاد کاربر SUPER_ADMIN اولیه

```typescript
// در Prisma Studio یا seed.ts
import bcrypt from 'bcryptjs';
import { prisma } from './lib/prisma';

async function createSuperAdmin() {
  const hashedPassword = await bcrypt.hash('YourStrongPassword123!', 10);
  
  const superAdmin = await prisma.user.create({
    data: {
      email: 'admin@belook.com',
      name: 'مدیر سیستم',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      emailVerified: new Date(),
    },
  });
  
  console.log('✅ Super Admin created:', superAdmin.email);
}
```

### 2. ارتقا کاربر به ADMIN

```typescript
// فقط SUPER_ADMIN می‌تواند این کار را انجام دهد
async function promoteToAdmin(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { role: 'ADMIN' },
  });
}
```

### 3. بررسی نقش در Client Component

```typescript
'use client';

import { useSession } from 'next-auth/react';

export default function MyComponent() {
  const { data: session } = useSession();
  const userRole = (session?.user as any)?.role;
  
  if (userRole === 'SUPER_ADMIN') {
    return <SuperAdminFeatures />;
  }
  
  if (userRole === 'ADMIN') {
    return <AdminFeatures />;
  }
  
  return <CustomerFeatures />;
}
```

---

## 🚀 مثال‌های عملی

### سناریو 1: ورود مشتری
```
1. علی به عنوان CUSTOMER ثبت‌نام می‌کند
2. وارد /fa/auth/login می‌شود
3. ایمیل و رمز عبور را وارد می‌کند
4. Redirect به /fa (صفحه اصلی فروشگاه)
5. می‌تواند محصولات را ببیند و خرید کند
6. اگر به /fa/admin برود → Redirect به /fa
```

### سناریو 2: ورود ادمین پشتیبانی
```
1. سارا به عنوان ADMIN توسط Super Admin اضافه می‌شود
2. وارد /fa/auth/login می‌شود
3. ایمیل و رمز عبور ADMIN را وارد می‌کند
4. Redirect به /fa/admin (داشبورد)
5. می‌تواند سفارشات را ببیند و مدیریت کند
6. اگر به /fa/admin/users برود → Redirect به /fa/admin
```

### سناریو 3: ورود سوپر ادمین
```
1. محمد به عنوان SUPER_ADMIN ایجاد می‌شود
2. وارد /fa/auth/login می‌شود
3. ایمیل و رمز عبور SUPER_ADMIN را وارد می‌کند
4. Redirect به /fa/admin (داشبورد)
5. دسترسی کامل به همه بخش‌ها دارد
6. می‌تواند کاربران جدید ایجاد و نقش‌ها را تغییر دهد
```

---

## 🎯 نکات مهم امنیتی

1. **همیشه رمزهای عبور را Hash کنید** (با bcrypt)
2. **JWT Token ها را Secure نگه دارید**
3. **NEXTAUTH_SECRET را در production تغییر دهید**
4. **2FA را برای SUPER_ADMIN فعال کنید**
5. **تمام route های admin را محافظت کنید**
6. **Log کنید چه کسی چه تغییراتی ایجاد می‌کند**
7. **Rate Limiting برای login اضافه کنید**

---

## 📞 راهنمای سریع

**چطور کاربر اول (SUPER_ADMIN) را بسازم؟**
```bash
# در Prisma Studio:
npx prisma studio

# یا با seed:
npx prisma db seed
```

**چطور نقش کاربر را تغییر دهم؟**
```
1. وارد Prisma Studio شوید
2. جدول users را باز کنید
3. کاربر مورد نظر را پیدا کنید
4. فیلد role را به ADMIN یا SUPER_ADMIN تغییر دهید
5. Save کنید
```

**اگر رمز SUPER_ADMIN را فراموش کردم چکار کنم؟**
```typescript
// یک اسکریپت بسازید:
import bcrypt from 'bcryptjs';
import { prisma } from './lib/prisma';

const newPassword = await bcrypt.hash('NewPassword123!', 10);
await prisma.user.update({
  where: { email: 'admin@belook.com' },
  data: { password: newPassword },
});
```

---

✅ **سیستم آماده است و می‌توانید شروع کنید!**
