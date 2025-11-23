'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCartStore } from '@/store/cartStore';
import { formatCurrency } from '@/lib/utils';
import { CheckCircle2, CreditCard, Truck, MapPin } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { toPersianDigits } from '@/lib/utils/numbers';

const checkoutSchema = z.object({
  fullName: z.string().min(3, 'نام و نام خانوادگی باید حداقل 3 کاراکتر باشد'),
  phone: z.string().regex(/^09\d{9}$/, 'شماره موبایل معتبر نیست'),
  email: z.string().email('ایمیل معتبر نیست').optional().or(z.literal('')),
  province: z.string().min(2, 'استان را انتخاب کنید'),
  city: z.string().min(2, 'شهر را وارد کنید'),
  address: z.string().min(10, 'آدرس باید حداقل 10 کاراکتر باشد'),
  postalCode: z.string().regex(/^\d{10}$/, 'کد پستی باید 10 رقم باشد'),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('online');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const subtotal = getTotal();
  const shipping = subtotal > 500000 ? 0 : 30000;
  const tax = Math.round(subtotal * 0.09);
  const total = subtotal + shipping + tax;

  const onSubmit = async (data: CheckoutFormData) => {
    if (step === 1) {
      setStep(2);
      return;
    }

    try {
      // در اینجا باید API فراخوانی شود
      toast.success('سفارش شما با موفقیت ثبت شد!');
      clearCart();
      router.push(`/${locale}/order/success`);
    } catch (error) {
      toast.error('خطا در ثبت سفارش');
    }
  };

  if (items.length === 0) {
    router.push(`/${locale}/cart`);
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4">
              {[
                { num: 1, title: 'اطلاعات ارسال', icon: MapPin },
                { num: 2, title: 'روش پرداخت', icon: CreditCard },
                { num: 3, title: 'تکمیل', icon: CheckCircle2 },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.num} className="flex items-center">
                    <div
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                        step >= s.num
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{s.title}</span>
                    </div>
                    {s.num < 3 && (
                      <div className="w-12 h-0.5 bg-border mx-2" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2 space-y-6">
                {step === 1 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Truck className="h-5 w-5" />
                        اطلاعات ارسال
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            نام و نام خانوادگی *
                          </label>
                          <Input {...register('fullName')} />
                          {errors.fullName && (
                            <p className="text-xs text-red-500 mt-1">
                              {errors.fullName.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            شماره موبایل *
                          </label>
                          <Input {...register('phone')} placeholder="09123456789" />
                          {errors.phone && (
                            <p className="text-xs text-red-500 mt-1">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          ایمیل (اختیاری)
                        </label>
                        <Input {...register('email')} type="email" />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            استان *
                          </label>
                          <Input {...register('province')} />
                          {errors.province && (
                            <p className="text-xs text-red-500 mt-1">
                              {errors.province.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            شهر *
                          </label>
                          <Input {...register('city')} />
                          {errors.city && (
                            <p className="text-xs text-red-500 mt-1">
                              {errors.city.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          آدرس کامل *
                        </label>
                        <textarea
                          {...register('address')}
                          className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2"
                        />
                        {errors.address && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.address.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          کد پستی *
                        </label>
                        <Input {...register('postalCode')} placeholder="1234567890" />
                        {errors.postalCode && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.postalCode.message}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {step === 2 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        روش پرداخت
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div
                        onClick={() => setPaymentMethod('online')}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === 'online'
                            ? 'border-primary bg-primary/5'
                            : 'border-border'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 ${
                            paymentMethod === 'online'
                              ? 'border-primary bg-primary'
                              : 'border-border'
                          }`}>
                            {paymentMethod === 'online' && (
                              <div className="w-full h-full rounded-full bg-white scale-50" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold">پرداخت آنلاین</p>
                            <p className="text-sm text-muted-foreground">
                              پرداخت امن با کارت بانکی
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === 'cod'
                            ? 'border-primary bg-primary/5'
                            : 'border-border'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 ${
                            paymentMethod === 'cod'
                              ? 'border-primary bg-primary'
                              : 'border-border'
                          }`}>
                            {paymentMethod === 'cod' && (
                              <div className="w-full h-full rounded-full bg-white scale-50" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold">پرداخت در محل</p>
                            <p className="text-sm text-muted-foreground">
                              پرداخت هنگام تحویل کالا
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Order Summary */}
              <div>
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>خلاصه سفارش</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>{item.nameFa} × {toPersianDigits(item.quantity.toString())}</span>
                          <span>{formatCurrency(item.price * item.quantity, 'fa')} تومان</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>جمع جزء</span>
                        <span>{formatCurrency(subtotal, 'fa')} تومان</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>هزینه ارسال</span>
                        <span>
                          {shipping === 0 ? 'رایگان' : formatCurrency(shipping, 'fa') + ' تومان'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>مالیات</span>
                        <span>{formatCurrency(tax, 'fa')} تومان</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold text-lg">
                        <span>مجموع</span>
                        <span className="text-primary">{formatCurrency(total, 'fa')} تومان</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {step === 1 && (
                        <Button type="submit" className="w-full" size="lg">
                          ادامه
                        </Button>
                      )}
                      {step === 2 && (
                        <>
                          <Button type="submit" className="w-full" size="lg">
                            ثبت سفارش و پرداخت
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => setStep(1)}
                          >
                            بازگشت
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
