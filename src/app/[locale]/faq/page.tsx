'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ChevronDown, Search } from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    { q: 'چگونه سفارش دهم؟', a: 'محصول را انتخاب کرده و به سبد خرید اضافه کنید.' },
    { q: 'هزینه ارسال چقدر است؟', a: 'برای خریدهای بالای 500 هزار تومان رایگان است.' },
    { q: 'مدت زمان ارسال؟', a: 'در تهران 1-2 روز و شهرستان 2-5 روز کاری.' },
    { q: 'شرایط مرجوعی؟', a: 'تا 7 روز پس از دریافت کالا قابل مرجوعی است.' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-4">سوالات متداول</h1>
        <p className="text-center text-muted-foreground mb-12">
          پاسخ سوالات رایج را اینجا بیابید
        </p>

        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="جستجوی سوال..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pe-10"
            />
          </div>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 flex items-center justify-between text-start hover:bg-secondary/50 transition-colors"
              >
                <span className="font-semibold">{faq.q}</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 text-muted-foreground">{faq.a}</div>
              )}
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
