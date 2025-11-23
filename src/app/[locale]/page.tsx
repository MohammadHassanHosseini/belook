import Header from '@/components/layout/Header';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import FlashSales from '@/components/home/FlashSales';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Categories from '@/components/home/Categories';
import BrandShowcase from '@/components/home/BrandShowcase';
import Testimonials from '@/components/home/Testimonials';
import InstagramFeed from '@/components/home/InstagramFeed';
import Newsletter from '@/components/home/Newsletter';
import Footer from '@/components/layout/Footer';

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Categories />
        <FlashSales />
        <FeaturedProducts />
        <Features />
        <BrandShowcase />
        <Testimonials />
        <InstagramFeed />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
