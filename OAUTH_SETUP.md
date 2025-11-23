# 🔐 راهنمای تنظیم OAuth برای ورود اجتماعی

## 📋 فهرست مطالب
1. [تنظیم Google OAuth](#google-oauth)
2. [تنظیم Microsoft OAuth](#microsoft-oauth)
3. [تنظیم محیط توسعه](#development-setup)
4. [تست ورود](#testing)

---

## 🌐 تنظیم Google OAuth

### مرحله 1: ایجاد پروژه در Google Cloud Console

1. به [Google Cloud Console](https://console.cloud.google.com/) بروید
2. روی **Create Project** کلیک کنید
3. نام پروژه را وارد کنید (مثلاً: "Belook Shop")
4. **Create** را کلیک کنید

### مرحله 2: فعال‌سازی Google+ API

1. در منوی چپ، **APIs & Services** > **Library** را انتخاب کنید
2. جستجو کنید: "Google+ API"
3. روی **Enable** کلیک کنید

### مرحله 3: ایجاد OAuth Credentials

1. **APIs & Services** > **Credentials** بروید
2. **Create Credentials** > **OAuth client ID** را انتخاب کنید
3. اگر اولین بار است، **Configure Consent Screen** را کلیک کنید:
   - User Type: **External** انتخاب کنید
   - App name: `Belook Shop`
   - User support email: ایمیل خود
   - Developer contact: ایمیل خود
   - **Save and Continue**
   
4. برگردید به **Credentials** و **Create OAuth client ID**:
   - Application type: **Web application**
   - Name: `Belook Web`
   
5. **Authorized JavaScript origins** اضافه کنید:
   ```
   http://localhost:3000
   https://your-domain.com
   ```
   
6. **Authorized redirect URIs** اضافه کنید:
   ```
   http://localhost:3000/api/auth/callback/google
   https://your-domain.com/api/auth/callback/google
   ```
   
7. **Create** را کلیک کنید

### مرحله 4: کپی Credentials

```env
GOOGLE_CLIENT_ID="1234567890-abc123def456.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-abc123def456ghi789"
```

این مقادیر را در فایل `.env.local` خود قرار دهید.

---

## 🔷 تنظیم Microsoft OAuth (Azure AD)

### مرحله 1: ثبت برنامه در Azure Portal

1. به [Azure Portal](https://portal.azure.com/) بروید
2. **Azure Active Directory** را باز کنید
3. **App registrations** > **New registration** کلیک کنید

### مرحله 2: پیکربندی برنامه

1. اطلاعات را وارد کنید:
   - Name: `Belook Shop`
   - Supported account types: **Accounts in any organizational directory and personal Microsoft accounts**
   - Redirect URI:
     - Platform: **Web**
     - URL: `http://localhost:3000/api/auth/callback/azure-ad`

2. **Register** را کلیک کنید

### مرحله 3: ایجاد Client Secret

1. در صفحه برنامه، به **Certificates & secrets** بروید
2. **New client secret** کلیک کنید
3. Description: `Belook Web Secret`
4. Expires: انتخاب کنید (توصیه: 24 months)
5. **Add** کلیک کنید
6. ⚠️ **فوراً Value را کپی کنید** (فقط یک بار نمایش داده می‌شود!)

### مرحله 4: کپی IDs

از صفحه **Overview**:

```env
AZURE_AD_CLIENT_ID="12345678-1234-1234-1234-123456789012"
AZURE_AD_CLIENT_SECRET="abc~123.def456GHI789-jkl012MNO"
AZURE_AD_TENANT_ID="common"
```

**نکته:** برای `AZURE_AD_TENANT_ID`:
- از `common` استفاده کنید برای پذیرش همه حساب‌های Microsoft
- یا Directory (tenant) ID مخصوص سازمان خود را وارد کنید

### مرحله 5: اضافه کردن Redirect URIs اضافی

1. **Authentication** بروید
2. **Add a platform** > **Web**
3. URIs اضافی اضافه کنید:
   ```
   https://your-domain.com/api/auth/callback/azure-ad
   ```

---

## ⚙️ تنظیم محیط توسعه

### 1. فایل `.env.local` ایجاد کنید

```bash
cp .env.example .env.local
```

### 2. مقادیر OAuth را پر کنید

```env
# OAuth Providers
GOOGLE_CLIENT_ID="your-actual-google-client-id"
GOOGLE_CLIENT_SECRET="your-actual-google-client-secret"

AZURE_AD_CLIENT_ID="your-actual-azure-client-id"
AZURE_AD_CLIENT_SECRET="your-actual-azure-client-secret"
AZURE_AD_TENANT_ID="common"

# NextAuth
NEXTAUTH_SECRET="generate-a-random-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. تولید NEXTAUTH_SECRET

روش 1 - در ترمینال:
```bash
openssl rand -base64 32
```

روش 2 - در Node.js:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 4. نصب Dependencies

اگر قبلاً نصب نکرده‌اید:
```bash
npm install next-auth @next-auth/prisma-adapter
npm install @prisma/client bcryptjs
npm install -D @types/bcryptjs
```

---

## 🧪 تست ورود

### 1. سرور را اجرا کنید

```bash
npm run dev
```

### 2. وارد صفحه ورود شوید

```
http://localhost:3000/fa/auth/login
```

### 3. دکمه‌های Social Login را تست کنید

- ✅ **ورود با گوگل**: باید به صفحه Google OAuth redirect شود
- ✅ **ورود با مایکروسافت**: باید به صفحه Microsoft OAuth redirect شود
- ✅ بعد از تایید، باید به پنل مدیریت یا صفحه اصلی redirect شود

---

## 🔍 عیب‌یابی

### خطا: "redirect_uri_mismatch" (Google)

**علت:** Redirect URI در Google Console تنظیم نشده است

**راه حل:**
1. به Google Cloud Console > Credentials بروید
2. OAuth 2.0 Client ID خود را باز کنید
3. در **Authorized redirect URIs** اضافه کنید:
   ```
   http://localhost:3000/api/auth/callback/google
   ```

### خطا: "invalid_client" (Microsoft)

**علت:** Client ID یا Secret اشتباه است

**راه حل:**
1. در Azure Portal، Client ID را از صفحه Overview بررسی کنید
2. Client Secret جدید بسازید (قدیمی ممکن است منقضی شده باشد)
3. مقادیر جدید را در `.env.local` قرار دهید

### خطا: NextAuth Session undefined

**راه حل:**
1. سرور را restart کنید
2. Cache browser را پاک کنید
3. بررسی کنید `NEXTAUTH_SECRET` تنظیم شده باشد

---

## 📱 تنظیمات Production

### 1. Domain واقعی را اضافه کنید

**Google Console:**
- Authorized JavaScript origins: `https://your-domain.com`
- Authorized redirect URIs: `https://your-domain.com/api/auth/callback/google`

**Azure Portal:**
- Redirect URI: `https://your-domain.com/api/auth/callback/azure-ad`

### 2. متغیرهای محیطی Production

```env
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="a-very-strong-random-secret-for-production"
```

### 3. HTTPS فقط

⚠️ **مهم:** در production، حتماً از HTTPS استفاده کنید.

---

## 🎯 نکات امنیتی

1. ✅ **هرگز** Client Secret را در کد commit نکنید
2. ✅ از `.env.local` برای development استفاده کنید
3. ✅ در production از Environment Variables سرور استفاده کنید
4. ✅ `NEXTAUTH_SECRET` را هر شش ماه یک بار تغییر دهید
5. ✅ Redirect URIs را محدود کنید (فقط domain های معتبر)
6. ✅ در Azure, **Implicit grant** را غیرفعال کنید
7. ✅ Certificate ها را به جای Secret استفاده کنید (برای enterprise)

---

## 📚 منابع بیشتر

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)
- [Microsoft Identity Platform](https://docs.microsoft.com/en-us/azure/active-directory/develop/)

---

## ✅ Checklist نهایی

- [ ] پروژه Google Cloud ساخته شد
- [ ] OAuth Client ID در Google ایجاد شد
- [ ] Redirect URIs در Google اضافه شد
- [ ] App در Azure AD ثبت شد
- [ ] Client Secret در Azure ایجاد شد
- [ ] Redirect URIs در Azure اضافه شد
- [ ] فایل `.env.local` با مقادیر واقعی پر شد
- [ ] `NEXTAUTH_SECRET` تولید شد
- [ ] سرور dev اجرا شد
- [ ] ورود با Google تست شد ✅
- [ ] ورود با Microsoft تست شد ✅

---

**همه چیز آماده است! 🎉**

می‌توانید از ورود اجتماعی استفاده کنید!
