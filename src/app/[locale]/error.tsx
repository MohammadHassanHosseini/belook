'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-purple-900">
      <div className="text-center p-8">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          مشکلی پیش آمد!
        </h2>
        <p className="text-muted-foreground mb-8">
          متأسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.
        </p>
        <Button
          onClick={reset}
          size="lg"
          className="bg-gradient-to-r from-primary to-purple-600"
        >
          تلاش مجدد
        </Button>
      </div>
    </div>
  );
}
