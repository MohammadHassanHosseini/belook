import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ورود به حساب کاربری | بی لوک',
  description: 'وارد حساب کاربری خود در فروشگاه آنلاین بی لوک شوید. ورود سریع و ایمن با ایمیل، گوگل یا گیت‌هاب',
  keywords: ['ورود', 'لاگین', 'حساب کاربری', 'بی لوک', 'پنل مدیریت', 'فروشگاه آنلاین'],
  openGraph: {
    title: 'ورود به حساب کاربری | بی لوک',
    description: 'وارد حساب کاربری خود در فروشگاه آنلاین بی لوک شوید',
    type: 'website',
    locale: 'fa_IR',
    siteName: 'بی لوک',
  },
  twitter: {
    card: 'summary',
    title: 'ورود به حساب کاربری | بی لوک',
    description: 'وارد حساب کاربری خود در فروشگاه آنلاین بی لوک شوید',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/auth/login',
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
