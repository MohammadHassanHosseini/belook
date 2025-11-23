import { Metadata } from 'next';
import ContactClient from '@/components/contact/ContactClient';

export const metadata: Metadata = {
  title: 'تماس با بی لوک | ارتباط با ما - فروشگاه آرایشی و بهداشتی',
  description: 'با تیم بی لوک در ارتباط باشید. پشتیبانی 24/7، مشاوره رایگان، و پاسخگویی سریع به سوالات شما. تلفن: 021-12345678',
  keywords: 'تماس با بی لوک, پشتیبانی, مشاوره, شماره تماس, آدرس, ایمیل',
  openGraph: {
    title: 'تماس با بی لوک',
    description: 'ما همیشه آماده پاسخگویی به شما هستیم',
    type: 'website',
  },
};

export default function ContactPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return <ContactClient locale={locale} />;
}
