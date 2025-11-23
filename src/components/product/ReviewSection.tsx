'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Star, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import { formatDate } from '@/lib/utils';
import { toPersianDigits } from '@/lib/utils/numbers';

interface Review {
  id: string;
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
  helpful: number;
  createdAt: Date;
  user: {
    name: string;
    avatar?: string;
  };
}

interface ReviewSectionProps {
  productId: string;
  reviews: Review[];
}

export default function ReviewSection({ productId, reviews: initialReviews }: ReviewSectionProps) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState(initialReviews);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      toast.error('برای ثبت نظر باید وارد شوید');
      return;
    }

    if (rating === 0) {
      toast.error('لطفاً امتیاز را انتخاب کنید');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          rating,
          title,
          comment,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('نظر شما برای تأیید ارسال شد');
        setRating(0);
        setTitle('');
        setComment('');
        setShowForm(false);
      } else {
        toast.error(data.error || 'خطا در ثبت نظر');
      }
    } catch (error) {
      toast.error('خطا در ثبت نظر');
    } finally {
      setLoading(false);
    }
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card className="p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">
              {toPersianDigits(averageRating.toFixed(1))}
            </div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${
                    i < Math.floor(averageRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              بر اساس {toPersianDigits(reviews.length.toString())} نظر
            </p>
          </div>

          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviews.filter((r) => r.rating === star).length;
              const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;

              return (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-sm w-8">{toPersianDigits(star.toString())} ستاره</span>
                  <div className="flex-1 bg-secondary rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-full rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12">
                    {toPersianDigits(count.toString())}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="w-full mt-6">
            ثبت نظر جدید
          </Button>
        )}
      </Card>

      {/* Review Form */}
      {showForm && (
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">نظر خود را بنویسید</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                امتیاز شما *
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    <Star
                      className={`h-8 w-8 cursor-pointer transition-colors ${
                        star <= (hoverRating || rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                عنوان (اختیاری)
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="خلاصه نظر شما"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                نظر شما *
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2"
                placeholder="نظر خود را بنویسید..."
                required
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>
                {loading ? 'در حال ارسال...' : 'ثبت نظر'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                انصراف
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center font-bold">
                {review.user.name.charAt(0)}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">{review.user.name}</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(review.createdAt, 'fa-IR')}
                  </span>
                </div>

                {review.title && (
                  <h4 className="font-semibold mb-2">{review.title}</h4>
                )}

                <p className="text-muted-foreground mb-4">{review.comment}</p>

                {review.images && review.images.length > 0 && (
                  <div className="flex gap-2 mb-4">
                    {review.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt=""
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}

                <Button variant="ghost" size="sm" className="gap-2">
                  <ThumbsUp className="h-4 w-4" />
                  مفید بود ({toPersianDigits(review.helpful.toString())})
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {reviews.length === 0 && !showForm && (
          <div className="text-center py-12 text-muted-foreground">
            هنوز نظری ثبت نشده است. اولین نفر باشید!
          </div>
        )}
      </div>
    </div>
  );
}
