import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-950 dark:via-purple-950/50 dark:to-blue-950/30">
      <div className="text-center p-8 max-w-2xl">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-black bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
            404
          </h1>
        </div>

        {/* Message */}
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          صفحه مورد نظر یافت نشد
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا منتقل شده است.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-purple-600">
            <Link href="/">
              <Home className="me-2 h-5 w-5" />
              بازگشت به صفحه اصلی
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/shop">
              <Search className="me-2 h-5 w-5" />
              جستجو در فروشگاه
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
