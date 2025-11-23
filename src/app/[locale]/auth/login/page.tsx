'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Chrome,
  Sparkles,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Microsoft Icon Component
const MicrosoftIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
    <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
    <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
    <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
  </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const locale = useLocale();
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});
  const [socialLoading, setSocialLoading] = useState<'google' | 'microsoft' | null>(null);
  const [mounted, setMounted] = useState(false);
  
  // Validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const validateForm = () => {
    const newErrors: {email?: string; password?: string} = {};
    
    if (!email) {
      newErrors.email = 'ایمیل الزامی است';
    } else if (!validateEmail(email)) {
      newErrors.email = 'ایمیل معتبر نیست';
    }
    
    if (!password) {
      newErrors.password = 'رمز عبور الزامی است';
    } else if (password.length < 6) {
      newErrors.password = 'رمز عبور باید حداقل ۶ کاراکتر باشد';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  // Credential login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setErrors({});

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error('ایمیل یا رمز عبور اشتباه است');
        setErrors({ email: ' ', password: 'اطلاعات ورود نادرست است' });
      } else {
        // Get user session to check role
        const response = await fetch('/api/auth/session');
        const session = await response.json();
        const userRole = session?.user?.role;
        
        // Save remember me preference
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        
        // Determine redirect based on role
        let redirectPath = `/${locale}`;
        if (userRole === 'SUPER_ADMIN' || userRole === 'ADMIN') {
          redirectPath = `/${locale}/admin`;
          toast.success(`خوش آمدید ${userRole === 'SUPER_ADMIN' ? 'مدیر کل' : 'ادمین'} عزیز! 🎉`);
        } else {
          toast.success('ورود موفقیت‌آمیز! خوش آمدید 🎉');
        }
        
        // Redirect after a short delay
        setTimeout(() => {
          router.push(redirectPath);
        }, 500);
      }
    } catch (error) {
      toast.error('خطا در برقراری ارتباط با سرور');
    } finally {
      setLoading(false);
    }
  };
  
  // Social login
  const handleSocialLogin = async (provider: 'google' | 'microsoft') => {
    setSocialLoading(provider);
    
    try {
      await signIn(provider, {
        callbackUrl: `/${locale}/admin`,
        redirect: true,
      });
    } catch (error) {
      toast.error(`خطا در ورود با ${provider === 'google' ? 'گوگل' : 'مایکروسافت'}`);
      setSocialLoading(null);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        
        {/* Floating elements */}
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="border-0 shadow-2xl backdrop-blur-sm bg-background/95">
          <CardContent className="p-8">
            {/* Logo & Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-600 text-white mb-4 shadow-lg"
              >
                <Sparkles className="w-8 h-8" />
              </motion.div>
              
              <h1 className="text-3xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2">
                خوش آمدید
              </h1>
              <p className="text-muted-foreground">
                ورود به پنل کاربری فروشگاه بی لوک
              </p>
            </div>

            {/* Social Login */}
            <div className="space-y-3 mb-6">
              <Button
                type="button"
                variant="outline"
                className="w-full gap-2 h-12"
                onClick={() => handleSocialLogin('google')}
                disabled={socialLoading !== null}
              >
                {socialLoading === 'google' ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Chrome className="w-5 h-5" />
                )}
                ورود با گوگل
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="w-full gap-2 h-12"
                onClick={() => handleSocialLogin('microsoft')}
                disabled={socialLoading !== null}
              >
                {socialLoading === 'microsoft' ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <MicrosoftIcon className="w-5 h-5" />
                )}
                ورود با مایکروسافت
              </Button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-background text-muted-foreground">
                  یا با ایمیل ادامه دهید
                </span>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold">
                  ایمیل
                </Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({...errors, email: undefined});
                    }}
                    placeholder="your@email.com"
                    className={cn(
                      "pr-10 h-12",
                      errors.email && "border-red-500 focus-visible:ring-red-500"
                    )}
                    disabled={loading}
                    autoFocus
                  />
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-xs text-red-500 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-semibold">
                    رمز عبور
                  </Label>
                  <Link
                    href={`/${locale}/auth/forgot-password`}
                    className="text-xs text-primary hover:underline"
                  >
                    فراموشی رمز عبور؟
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({...errors, password: undefined});
                    }}
                    placeholder="••••••••"
                    className={cn(
                      "pr-10 pl-10 h-12",
                      errors.password && "border-red-500 focus-visible:ring-red-500"
                    )}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-xs text-red-500 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.password}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <div className={cn("flex items-center gap-2", loading && "opacity-50 pointer-events-none")}>
                  <Checkbox
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label
                    className="text-sm cursor-pointer select-none"
                  >
                    مرا به خاطر بسپار
                  </Label>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 text-base font-bold gap-2 shadow-lg shadow-primary/30"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    در حال ورود...
                  </>
                ) : (
                  <>
                    ورود به پنل
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 space-y-4">
              <div className="text-center text-sm">
                <p className="text-muted-foreground">
                  حساب کاربری ندارید؟{' '}
                  <Link
                    href={`/${locale}/auth/register`}
                    className="text-primary font-semibold hover:underline"
                  >
                    ثبت‌نام کنید
                  </Link>
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                <Link href={`/${locale}/privacy`} className="hover:text-foreground transition-colors">
                  حریم خصوصی
                </Link>
                <span>•</span>
                <Link href={`/${locale}/terms`} className="hover:text-foreground transition-colors">
                  شرایط استفاده
                </Link>
                <span>•</span>
                <Link href={`/${locale}/help`} className="hover:text-foreground transition-colors">
                  راهنما
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-muted-foreground mt-6"
        >
          با ورود به سایت، شما{' '}
          <Link href={`/${locale}/terms`} className="underline hover:text-foreground">
            شرایط و ضوابط
          </Link>{' '}
          ما را می‌پذیرید
        </motion.p>
      </motion.div>
    </div>
  );
}
