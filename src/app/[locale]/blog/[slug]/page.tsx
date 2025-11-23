import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Clock, Eye } from 'lucide-react';
import Link from 'next/link';

export default async function BlogPostPage({ params }: { params: { locale: string; slug: string } }) {
  const post = {
    title: 'راهنمای کامل انتخاب سرم مناسب برای پوست',
    excerpt: 'سرم‌ها یکی از مهم‌ترین محصولات مراقبت از پوست هستند.',
    image: 'https://images.unsplash.com/photo-1620916297803-be2bd5580e4b?w=1200',
    author: { name: 'دکتر سارا احمدی' },
    category: 'مراقبت پوست',
    tags: ['سرم', 'مراقبت پوست'],
    publishedAt: new Date('2024-01-15'),
    readTime: 8,
    views: 1250,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          <Badge className="mb-4">{post.category}</Badge>
          <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
          
          <div className="flex gap-4 text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>۱۵ دی ۱۴۰۳</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} دقیقه</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>{post.views} بازدید</span>
            </div>
          </div>

          <img src={post.image} alt={post.title} className="w-full h-96 object-cover rounded-2xl mb-8" />

          <div className="prose max-w-none mb-8">
            <p>{post.excerpt}</p>
            <p>محتوای کامل مقاله در اینجا نمایش داده می‌شود...</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, i) => (
              <Badge key={i} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
