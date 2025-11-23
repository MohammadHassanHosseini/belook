# 🚀 تکنولوژی‌های پروژه بی لوک (Belook E-commerce)

## 📊 نمای کلی پروژه

**نام پروژه:** Belook - فروشگاه آنلاین لوازم آرایشی و بهداشتی  
**نسخه:** 1.0.0  
**وبسایت:** belook.ir  
**نوع پروژه:** Full-Stack E-commerce Platform  
**معماری:** Monolithic with Modern Stack  

---

## 🏗️ معماری کلی

```
┌─────────────────────────────────────────────┐
│              Frontend (Client)              │
│   Next.js 14 + React 18 + TypeScript       │
│   SSR, SSG, ISR, Client Components         │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│             API Layer (Server)              │
│   Next.js API Routes + Server Actions      │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│          Authentication Layer               │
│   NextAuth.js v4 + OAuth + Credentials     │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│             Database Layer                  │
│   PostgreSQL + Prisma ORM                  │
└─────────────────────────────────────────────┘
```

---

## 💻 تکنولوژی‌های اصلی (Core Technologies)

### 1. **Framework & Runtime**

#### Next.js 14.2.33
- **نوع:** React Framework
- **ویژگی‌ها:**
  - ✅ App Router (جدیدترین معماری)
  - ✅ Server-Side Rendering (SSR)
  - ✅ Static Site Generation (SSG)
  - ✅ Incremental Static Regeneration (ISR)
  - ✅ Server Components & Client Components
  - ✅ API Routes
  - ✅ Image Optimization
  - ✅ Font Optimization
  - ✅ Route Handlers
  - ✅ Middleware Support
  - ✅ Hot Module Replacement (HMR)

**چرا Next.js؟**
- SEO-friendly برای فروشگاه آنلاین
- Performance بالا با SSR و SSG
- Developer Experience عالی
- Built-in Optimization ها
- Production-ready out of the box

---

#### React 18.3.1
- **نوع:** UI Library
- **ویژگی‌ها:**
  - ✅ Concurrent Features
  - ✅ Automatic Batching
  - ✅ Transitions
  - ✅ Suspense
  - ✅ Server Components Support
  - ✅ Hooks (useState, useEffect, useContext, etc.)

**استفاده‌ها در پروژه:**
- Component-based Architecture
- State Management
- Lifecycle Management
- Event Handling

---

#### TypeScript 5.5.4
- **نوع:** Programming Language
- **ویژگی‌ها:**
  - ✅ Type Safety
  - ✅ IntelliSense
  - ✅ Compile-time Error Detection
  - ✅ Better Refactoring
  - ✅ Modern ECMAScript Features

**چرا TypeScript؟**
- کاهش Bugs در Production
- Developer Experience بهتر
- Maintainability بالاتر
- Auto-completion در IDE
- Scalability بهتر

---

## 🎨 UI & Styling

### 1. **Tailwind CSS 3.4.7**
- **نوع:** Utility-First CSS Framework
- **ویژگی‌ها:**
  - ✅ Utility Classes
  - ✅ Responsive Design
  - ✅ Dark Mode Support
  - ✅ Custom Configuration
  - ✅ JIT Compiler
  - ✅ PurgeCSS Integration

**استفاده‌ها:**
```tsx
<div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
    عنوان
  </h1>
</div>
```

**افزونه‌های Tailwind:**
- `tailwindcss-animate`: انیمیشن‌های آماده
- `tailwind-merge`: ترکیب هوشمند کلاس‌ها
- Autoprefixer: سازگاری با مرورگرها

---

### 2. **Radix UI**
- **نوع:** Headless UI Components
- **کامپوننت‌های استفاده شده:**
  - ✅ Dialog (Modal)
  - ✅ Dropdown Menu
  - ✅ Slot (Composition)
  - ✅ Checkbox (via shadcn)
  - ✅ Label
  - ✅ Input
  - ✅ Button
  - ✅ Card

**ویژگی‌ها:**
- Accessible (WAI-ARIA compliant)
- Unstyled (قابل شخصی‌سازی کامل)
- Composable
- Keyboard Navigation
- Focus Management

**مثال استفاده:**
```tsx
<Dialog>
  <DialogTrigger>باز کردن</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>عنوان</DialogTitle>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

---

### 3. **Framer Motion 11.3.19**
- **نوع:** Animation Library
- **ویژگی‌ها:**
  - ✅ Declarative Animations
  - ✅ Gesture Animations
  - ✅ Layout Animations
  - ✅ Scroll Animations
  - ✅ Exit Animations (AnimatePresence)
  - ✅ Spring Physics
  - ✅ Keyframes

**استفاده‌های در پروژه:**
```tsx
// انیمیشن ظاهر شدن
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  محتوا
</motion.div>

// انیمیشن خروج
<AnimatePresence>
  {show && (
    <motion.div
      exit={{ opacity: 0, scale: 0.8 }}
    >
      نوتیفیکیشن
    </motion.div>
  )}
</AnimatePresence>
```

**مکان‌های استفاده:**
- صفحات ورود و ثبت‌نام (Background Animation)
- Modal ها
- Notifications
- Page Transitions
- Loading States
- Hover Effects

---

### 4. **Lucide React 0.416.0**
- **نوع:** Icon Library
- **ویژگی‌ها:**
  - ✅ 1000+ Icons
  - ✅ Tree-shakable
  - ✅ Customizable
  - ✅ Consistent Design
  - ✅ SVG-based

**آیکون‌های استفاده شده:**
- Mail, Lock, Eye, EyeOff
- User, UserPlus
- Chrome (Google)
- Sparkles, Shield, Fingerprint
- ArrowRight, Loader2
- Check, X, Trash2
- Bell, Search, Menu
- و بیش از 100 آیکون دیگر

---

### 5. **Class Variance Authority (CVA)**
- **نوع:** Component Variant Manager
- **استفاده:**
```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        default: "bg-primary text-white",
        outline: "border border-input",
        ghost: "hover:bg-accent",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-10 px-4",
        lg: "h-11 px-8",
      },
    },
  }
);
```

**مزایا:**
- Type-safe Variants
- Conditional Styling
- Better DX

---

## 🔐 Authentication & Security

### 1. **NextAuth.js 4.24.7**
- **نوع:** Authentication Library
- **ویژگی‌ها:**
  - ✅ Multiple Providers
  - ✅ JWT Sessions
  - ✅ Database Sessions
  - ✅ Callbacks & Events
  - ✅ Type-safe

**Providers پیاده‌سازی شده:**
1. **Credentials Provider** (Email/Password)
2. **Google OAuth**
3. **Microsoft Azure AD OAuth**

**Flow احراز هویت:**
```
User Login
    ↓
NextAuth.js
    ↓
Prisma Adapter
    ↓
PostgreSQL
    ↓
JWT Token
    ↓
Session
```

**Callbacks:**
```typescript
callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.role = user.role;
    }
    return token;
  },
  async session({ session, token }) {
    session.user.role = token.role;
    return session;
  },
}
```

---

### 2. **bcryptjs 2.4.3**
- **نوع:** Password Hashing
- **ویژگی‌ها:**
  - ✅ Salting
  - ✅ Rainbow Table Resistant
  - ✅ Configurable Rounds

**استفاده:**
```typescript
// Hash password
const hashedPassword = await bcrypt.hash(password, 10);

// Compare password
const isValid = await bcrypt.compare(password, hashedPassword);
```

---

### 3. **Prisma Adapter**
- **نوع:** Database Adapter for NextAuth
- **ویژگی‌ها:**
  - ✅ Automatic Session Management
  - ✅ Account Linking
  - ✅ Token Management

---

## 🗄️ Database & ORM

### 1. **PostgreSQL**
- **نوع:** Relational Database
- **ویژگی‌ها:**
  - ✅ ACID Compliant
  - ✅ Scalable
  - ✅ Advanced Indexing
  - ✅ JSON Support
  - ✅ Full-Text Search

**چرا PostgreSQL؟**
- Reliable و Production-ready
- Performance بالا
- Feature-rich
- Open-source
- Community Support عالی

---

### 2. **Prisma ORM 5.17.0**
- **نوع:** Next-generation ORM
- **ویژگی‌ها:**
  - ✅ Type-safe Queries
  - ✅ Auto-completion
  - ✅ Migration System
  - ✅ Prisma Studio (GUI)
  - ✅ Relation Support
  - ✅ Transaction Support

**Schema:**
```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  password      String
  name          String
  role          UserRole @default(CUSTOMER)
  orders        Order[]
  reviews       Review[]
  createdAt     DateTime @default(now())
}

enum UserRole {
  CUSTOMER
  ADMIN
  SUPER_ADMIN
}
```

**Query Example:**
```typescript
const user = await prisma.user.findUnique({
  where: { email },
  include: {
    orders: true,
    reviews: true,
  },
});
```

**Commands:**
```bash
npx prisma generate      # Generate Client
npx prisma db push       # Push Schema to DB
npx prisma studio        # Open GUI
npx prisma migrate dev   # Create Migration
```

---

## 🌍 Internationalization (i18n)

### **next-intl 4.4.0**
- **نوع:** i18n Library
- **زبان‌های پشتیبانی شده:**
  - 🇮🇷 فارسی (fa) - پیش‌فرض
  - 🇬🇧 انگلیسی (en)
  - 🇸🇦 عربی (ar)

**ویژگی‌ها:**
- ✅ SSR Support
- ✅ Type-safe Translations
- ✅ Locale Routing
- ✅ RTL Support
- ✅ Number & Date Formatting
- ✅ Pluralization

**ساختار:**
```
messages/
  ├── fa.json
  ├── en.json
  └── ar.json
```

**استفاده:**
```tsx
import { useTranslations } from 'next-intl';

export default function Component() {
  const t = useTranslations('HomePage');
  
  return <h1>{t('title')}</h1>;
}
```

**Routing:**
```
/fa/products     → فارسی
/en/products     → English
/ar/products     → العربية
```

---

## 📝 Form Management

### 1. **React Hook Form 7.52.1**
- **نوع:** Form Library
- **ویژگی‌ها:**
  - ✅ Performance بالا (Uncontrolled)
  - ✅ Validation
  - ✅ TypeScript Support
  - ✅ Less Re-renders
  - ✅ Easy Integration

**مثال:**
```tsx
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
});

<input {...register("email")} />
{errors.email && <span>{errors.email.message}</span>}
```

---

### 2. **Zod 3.23.8**
- **نوع:** Schema Validation
- **ویژگی‌ها:**
  - ✅ TypeScript-first
  - ✅ Type Inference
  - ✅ Composable
  - ✅ Error Messages

**مثال:**
```typescript
const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
});

type User = z.infer<typeof userSchema>;
```

---

### 3. **Hookform Resolvers 3.9.0**
- **نوع:** Validation Resolver
- **استفاده:** اتصال Zod به React Hook Form

---

## 🎭 State Management

### 1. **Zustand 4.5.4**
- **نوع:** State Management Library
- **ویژگی‌ها:**
  - ✅ Simple API
  - ✅ No Boilerplate
  - ✅ TypeScript Support
  - ✅ Middleware Support
  - ✅ DevTools

**مثال استفاده:**
```typescript
// NotificationsContext (Context API pattern)
const NotificationsContext = createContext();

export function useNotifications() {
  return useContext(NotificationsContext);
}
```

---

### 2. **React Context API**
- **استفاده‌ها:**
  - Notifications Context
  - Dashboard Context
  - Theme Context
  - Auth Context

**مثال:**
```tsx
<NotificationsProvider>
  <DashboardProvider>
    <App />
  </DashboardProvider>
</NotificationsProvider>
```

---

## 🎪 UI Components & Utilities

### 1. **React Dropzone 14.2.3**
- **استفاده:** File Upload
- **ویژگی‌ها:**
  - Drag & Drop
  - File Type Validation
  - Size Validation
  - Multiple Files

---

### 2. **Recharts 2.12.7**
- **استفاده:** Data Visualization
- **نمودارها:**
  - Line Chart
  - Bar Chart
  - Pie Chart
  - Area Chart
  - Responsive Charts

**مثال:**
```tsx
<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <Line type="monotone" dataKey="sales" />
    <XAxis dataKey="name" />
    <YAxis />
  </LineChart>
</ResponsiveContainer>
```

---

### 3. **React Hot Toast 2.4.1**
- **استفاده:** Notifications
- **ویژگی‌ها:**
  - Beautiful Toasts
  - Promise Support
  - Custom Styling
  - RTL Support

**استفاده:**
```tsx
toast.success('عملیات موفق!');
toast.error('خطا رخ داد');
toast.loading('در حال بارگذاری...');
```

---

### 4. **Embla Carousel 8.1.7**
- **استفاده:** Image Carousel
- **ویژگی‌ها:**
  - Touch/Swipe Support
  - Responsive
  - Customizable
  - Lightweight

---

### 5. **date-fns 3.6.0**
- **استفاده:** Date Utilities
- **عملیات:**
  - Format Dates
  - Parse Dates
  - Date Arithmetic
  - Locale Support

---

### 6. **Sharp 0.33.4**
- **استفاده:** Image Processing
- **ویژگی‌ها:**
  - Resize Images
  - Optimize Images
  - Convert Formats
  - Fast Performance

---

### 7. **clsx + tailwind-merge**
- **استفاده:** Conditional Classes
```tsx
import { cn } from '@/lib/utils';

<div className={cn(
  "base-class",
  isActive && "active-class",
  "override-class"
)} />
```

---

## 🛠️ Development Tools

### 1. **ESLint 8.57.0**
- **استفاده:** Code Linting
- **Config:** eslint-config-next
- **ویژگی‌ها:**
  - Code Quality
  - Best Practices
  - Error Prevention

---

### 2. **TypeScript Compiler**
- **استفاده:** Type Checking
- **Config:** tsconfig.json
- **Strict Mode:** Enabled

---

### 3. **PostCSS 8.4.40**
- **استفاده:** CSS Processing
- **Plugins:**
  - Tailwind CSS
  - Autoprefixer
  - CSS Nesting

---

### 4. **TSX 4.16.2**
- **استفاده:** Run TypeScript files
- **مثال:** Database Seeding

---

## 📦 Build & Deployment

### **Next.js Build System**
- **Output:** Optimized Production Build
- **Features:**
  - Code Splitting
  - Tree Shaking
  - Minification
  - Image Optimization
  - Font Optimization

**Commands:**
```bash
npm run dev      # Development Server
npm run build    # Production Build
npm run start    # Production Server
npm run lint     # Run ESLint
```

---

## 🏛️ Project Structure

```
belook/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   ├── admin/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── products/
│   │   │   │   ├── orders/
│   │   │   │   └── users/
│   │   │   └── (shop)/
│   │   │       ├── products/
│   │   │       ├── cart/
│   │   │       └── checkout/
│   │   └── api/
│   │       ├── auth/
│   │       └── products/
│   ├── components/
│   │   ├── ui/           # Radix UI Components
│   │   ├── admin/        # Admin Components
│   │   └── shop/         # Shop Components
│   ├── lib/
│   │   ├── prisma.ts     # Prisma Client
│   │   ├── auth.ts       # NextAuth Config
│   │   └── utils.ts      # Utilities
│   ├── contexts/
│   │   ├── NotificationsContext.tsx
│   │   └── DashboardContext.tsx
│   └── i18n/
│       └── routing.ts
├── prisma/
│   ├── schema.prisma     # Database Schema
│   └── seed.ts           # Seed Data
├── public/
│   └── uploads/          # User Uploads
├── messages/
│   ├── fa.json
│   ├── en.json
│   └── ar.json
├── .env.local            # Environment Variables
├── tailwind.config.js    # Tailwind Config
├── tsconfig.json         # TypeScript Config
└── package.json          # Dependencies
```

---

## 🎯 Features Implemented

### ✅ Authentication System
- Email/Password Login
- Google OAuth
- Microsoft OAuth
- Role-based Access (CUSTOMER, ADMIN, SUPER_ADMIN)
- Protected Routes
- Session Management
- JWT Tokens

### ✅ Admin Panel
- Dashboard با Charts
- مدیریت محصولات
- مدیریت سفارشات
- مدیریت کاربران
- سیستم اعلانات
- چت پشتیبانی
- تنظیمات سیستم

### ✅ Shop Features
- لیست محصولات
- جزئیات محصول
- سبد خرید
- پرداخت
- پیگیری سفارش
- نظرات و امتیازدهی

### ✅ UI/UX
- Dark Mode
- RTL Support
- Responsive Design
- انیمیشن‌های Smooth
- Loading States
- Error Handling
- Toast Notifications

### ✅ SEO
- Metadata برای تمام صفحات
- OpenGraph Tags
- Twitter Cards
- Sitemap
- Robots.txt

---

## 📊 Performance Optimizations

### 1. **Next.js Optimizations**
- ✅ Image Optimization (next/image)
- ✅ Font Optimization (next/font)
- ✅ Code Splitting
- ✅ Tree Shaking
- ✅ Lazy Loading

### 2. **React Optimizations**
- ✅ Memoization (useMemo, useCallback)
- ✅ Lazy Components
- ✅ Suspense Boundaries
- ✅ Code Splitting

### 3. **Database Optimizations**
- ✅ Indexes
- ✅ Query Optimization
- ✅ Connection Pooling
- ✅ Caching Strategy

---

## 🔒 Security Features

### 1. **Authentication Security**
- ✅ Password Hashing (bcrypt)
- ✅ JWT Tokens
- ✅ CSRF Protection
- ✅ Session Security
- ✅ Rate Limiting (توصیه شده)

### 2. **Data Security**
- ✅ SQL Injection Prevention (Prisma)
- ✅ XSS Protection
- ✅ Input Validation (Zod)
- ✅ Environment Variables
- ✅ Secure Headers

### 3. **API Security**
- ✅ Authentication Required
- ✅ Role-based Authorization
- ✅ Request Validation
- ✅ Error Handling

---

## 🌟 Best Practices

### 1. **Code Quality**
- ✅ TypeScript Strict Mode
- ✅ ESLint Rules
- ✅ Consistent Naming
- ✅ Component Composition
- ✅ DRY Principle

### 2. **Architecture**
- ✅ Separation of Concerns
- ✅ Modular Components
- ✅ Reusable Hooks
- ✅ Context for Global State
- ✅ API Route Handlers

### 3. **Testing Ready**
- Component Structure
- Separation of Logic
- Testable Functions
- Mock-friendly Design

---

## 📈 Scalability

### Current Capabilities
- ✅ Horizontal Scaling (Next.js)
- ✅ Database Scaling (PostgreSQL)
- ✅ CDN Ready
- ✅ Cache Strategy
- ✅ Load Balancing Ready

### Future Enhancements
- Redis Caching
- Microservices
- Message Queue
- GraphQL API
- Mobile App (React Native)

---

## 🚀 Deployment

### Recommended Platforms
1. **Vercel** (بهترین برای Next.js)
   - Zero-config
   - Edge Functions
   - Analytics
   - Preview Deployments

2. **Railway/Render**
   - PostgreSQL Hosting
   - Easy Setup
   - Auto-scaling

3. **AWS/DigitalOcean**
   - Full Control
   - Custom Configuration

### Environment Variables
```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://belook.ir
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
AZURE_AD_CLIENT_ID=...
AZURE_AD_CLIENT_SECRET=...
```

---

## 📚 Documentation

### Internal Docs
- ✅ `AUTHENTICATION_FLOW.md` - سیستم احراز هویت
- ✅ `OAUTH_SETUP.md` - راهنمای OAuth
- ✅ `TECH_STACK.md` - این سند
- ✅ `README.md` - راهنمای نصب

### External Resources
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Prisma Docs](https://prisma.io/docs)
- [NextAuth Docs](https://next-auth.js.org)
- [Tailwind Docs](https://tailwindcss.com/docs)

---

## 🎓 Learning Path

برای کار با این پروژه باید با موارد زیر آشنا باشید:

### مبتدی
1. HTML, CSS, JavaScript
2. React Basics
3. TypeScript Basics
4. Git & GitHub

### متوسط
1. Next.js App Router
2. Server Components vs Client Components
3. API Routes
4. Database Basics (SQL)
5. Authentication Concepts

### پیشرفته
1. Prisma ORM
2. NextAuth.js
3. State Management
4. Performance Optimization
5. Security Best Practices

---

## 📞 نکات مهم برای توسعه‌دهندگان

### ⚡ Quick Start
```bash
# Clone
git clone <repo>

# Install
npm install

# Setup DB
npx prisma db push

# Run
npm run dev
```

### 🔧 Common Tasks
```bash
# Add new model
1. Edit prisma/schema.prisma
2. npx prisma db push
3. npx prisma generate

# Create new page
1. Create in app/[locale]/your-page/
2. Add metadata in layout.tsx
3. Implement page.tsx

# Add new component
1. Create in components/
2. Export from index
3. Import and use
```

### 🐛 Debugging
- Use React DevTools
- Use Prisma Studio
- Check Network Tab
- Console Logs
- TypeScript Errors

---

## 🎯 Summary

### تکنولوژی‌های کلیدی:
1. ✅ **Frontend:** Next.js 14 + React 18 + TypeScript
2. ✅ **Styling:** Tailwind CSS + Radix UI
3. ✅ **Animation:** Framer Motion
4. ✅ **Database:** PostgreSQL + Prisma
5. ✅ **Auth:** NextAuth.js + OAuth
6. ✅ **Forms:** React Hook Form + Zod
7. ✅ **i18n:** next-intl (3 زبان)
8. ✅ **State:** Context API
9. ✅ **Icons:** Lucide React
10. ✅ **Notifications:** React Hot Toast

### مزایای Stack انتخابی:
- 🚀 Performance بالا
- 🔒 امنیت خوب
- 📱 Responsive
- 🌍 Multi-language
- ♿ Accessible
- 🎨 Modern UI/UX
- 🔧 Developer-friendly
- 📈 Scalable
- 🧪 Testable
- 📦 Production-ready

---

**نسخه سند:** 1.0.0  
**آخرین بروزرسانی:** نوامبر 2025  
**نگهداری توسط:** Belook Development Team

---

© 2025 Belook - All Rights Reserved
