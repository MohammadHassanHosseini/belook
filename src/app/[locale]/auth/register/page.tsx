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
  Loader2,
  User,
  UserPlus
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

export default function RegisterPage() {
  const router = useRouter();
  const locale = useLocale();
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  }>({});
  const [socialLoading, setSocialLoading] = useState<'google' | 'microsoft' | null>(null);
  
  // Validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const validatePassword = (password: string) => {
    // حداقل 8 کاراکتر، شامل حروف و اعداد
    return password.length >= 8;
  };
  
  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!name.trim()) {
      newErrors.name = 'نام الزامی است';
    } else if (name.trim().length < 2) {
      newErrors.name = 'نام باید حداقل ۲ کاراکتر باشد';
    }
    
    if (!email) {
      newErrors.email = 'ایمیل الزامی است';
    } else if (!validateEmail(email)) {
      newErrors.email = 'ایمیل معتبر نیست';
    }
    
    if (!password) {
      newErrors.password = 'رمز عبور الزامی است';
    } else if (!validatePassword(password)) {
      newErrors.password = 'رمز عبور باید حداقل ۸ کاراکتر باشد';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'تکرار رمز عبور الزامی است';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'رمز عبور و تکرار آن یکسان نیستند';
    }
    
    if (!acceptTerms) {
      newErrors.terms = 'لطفاً شرایط و قوانین را بپذیرید';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Register with credentials
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setErrors({});

    try {
      // ثبت‌نام کاربر جدید
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.toLowerCase(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setErrors({ email: 'این ایمیل قبلاً ثبت شده است' });
          toast.error('این ایمیل قبلاً ثبت شده است');
        } else {
          toast.error(data.message || 'خطا در ثبت‌نام');
        }
        return;
      }

      // ورود خودکار بعد از ثبت‌نام
      const signInResult = await signIn('credentials', {
        email: email.toLowerCase(),
        password,
        redirect: false,
      });

      if (signInResult?.error) {
        toast.success('ثبت‌نام موفق! لطفاً وارد شوید');
        router.push(`/${locale}/auth/login`);
      } else {
        toast.success('ثبت‌نام و ورود موفقیت‌آمیز! خوش آمدید 🎉');
        
        // Redirect to home
        setTimeout(() => {
          router.push(`/${locale}`);
        }, 500);
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('خطا در برقراری ارتباط با سرور');
    } finally {
      setLoading(false);
    }
  };
  
  // Social register
  const handleSocialRegister = async (provider: 'google' | 'microsoft') => {
    setSocialLoading(provider);
    
    try {
      await signIn(provider, {
        callbackUrl: `/${locale}`,
        redirect: true,
      });
    } catch (error) {
      toast.error(`خطا در ثبت‌نام با ${provider === 'google' ? 'گوگل' : 'مایکروسافت'}`);
      setSocialLoading(null);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        
        {/* Floating elements */}
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20"
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
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white mb-4 shadow-lg"
              >
                <UserPlus className="w-8 h-8" />
              </motion.div>
              
              <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                ثبت‌نام
              </h1>
              <p className="text-muted-foreground">
                عضویت در فروشگاه بی لوک
              </p>
            </div>

            {/* Social Register */}
            <div className="space-y-3 mb-6">
              <Button
                type="button"
                variant="outline"
                className="w-full gap-2 h-12"
                onClick={() => handleSocialRegister('google')}
                disabled={socialLoading !== null}
              >
                {socialLoading === 'google' ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Chrome className="w-5 h-5" />
                )}
                ثبت‌نام با گوگل
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="w-full gap-2 h-12"
                onClick={() => handleSocialRegister('microsoft')}
                disabled={socialLoading !== null}
              >
                {socialLoading === 'microsoft' ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <MicrosoftIcon className="w-5 h-5" />
                )}
                ثبت‌نام با مایکروسافت
              </Button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-background text-muted-foreground">
                  یا با ایمیل ثبت‌نام کنید
                </span>
              </div>
            </div>

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold">
                  نام و نام خانوادگی
                </Label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({...errors, name: undefined});
                    }}
                    placeholder="نام کامل خود را وارد کنید"
                    className={cn(
                      "pr-10 h-12",
                      errors.name && "border-red-500 focus-visible:ring-red-500"
                    )}
                    disabled={loading}
                    autoFocus
                  />
                </div>
                <AnimatePresence>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-xs text-red-500 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

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
                <Label htmlFor="password" className="text-sm font-semibold">
                  رمز عبور
                </Label>
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
                    placeholder="حداقل ۸ کاراکتر"
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

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-semibold">
                  تکرار رمز عبور
                </Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword) setErrors({...errors, confirmPassword: undefined});
                    }}
                    placeholder="رمز عبور را مجدداً وارد کنید"
                    className={cn(
                      "pr-10 pl-10 h-12",
                      errors.confirmPassword && "border-red-500 focus-visible:ring-red-500"
                    )}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <AnimatePresence>
                  {errors.confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-xs text-red-500 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.confirmPassword}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Terms & Conditions */}
              <div className="space-y-2">
                <div className={cn(
                  "flex items-start gap-2",
                  loading && "opacity-50 pointer-events-none"
                )}>
                  <Checkbox
                    checked={acceptTerms}
                    onCheckedChange={(checked) => {
                      setAcceptTerms(checked as boolean);
                      if (errors.terms) setErrors({...errors, terms: undefined});
                    }}
                    className="mt-1"
                  />
                  <Label className="text-sm cursor-pointer select-none leading-relaxed">
                    <Link href={`/${locale}/terms`} className="text-primary hover:underline">
                      شرایط و قوانین
                    </Link>
                    {' '}و{' '}
                    <Link href={`/${locale}/privacy`} className="text-primary hover:underline">
                      حریم خصوصی
                    </Link>
                    {' '}را مطالعه کرده و می‌پذیرم
                  </Label>
                </div>
                <AnimatePresence>
                  {errors.terms && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-xs text-red-500 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.terms}
                    </motion.p>
                  )}
                </AnimatePresence>
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
                    در حال ثبت‌نام...
                  </>
                ) : (
                  <>
                    ثبت‌نام
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                قبلاً ثبت‌نام کرده‌اید؟{' '}
                <Link
                  href={`/${locale}/auth/login`}
                  className="text-primary font-semibold hover:underline"
                >
                  وارد شوید
                </Link>
              </p>
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
          با ثبت‌نام، شما{' '}
          <Link href={`/${locale}/terms`} className="underline hover:text-foreground">
            شرایط و ضوابط
          </Link>{' '}
          ما را می‌پذیرید
        </motion.p>
      </motion.div>
    </div>
  );
}
