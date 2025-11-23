import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductDetail from '@/components/product/ProductDetail';

interface Props {
  params: {
    locale: string;
    slug: string;
  };
}

// This would fetch from API in production
async function getProduct(slug: string) {
  // Mock data for now
  return {
    id: '1',
    slug,
    sku: 'BLK-001',
    nameEn: 'Vitamin C Brightening Serum',
    nameFa: 'سرم ویتامین C روشن کننده',
    nameAr: 'سيروم فيتامين سي المضيء',
    descriptionEn: 'A powerful vitamin C serum that brightens and evens skin tone.',
    descriptionFa: 'سرم قدرتمند ویتامین C که پوست را روشن و یکدست می‌کند.',
    descriptionAr: 'سيروم فيتامين سي قوي يضيء البشرة ويوحد لونها.',
    price: 450000,
    comparePrice: 550000,
    images: [
      'https://images.unsplash.com/photo-1620916297803-be2bd5580e4b?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1556228852-80f3c5145c7d?w=800&h=800&fit=crop',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1620916297803-be2bd5580e4b?w=400&h=400&fit=crop',
    stock: 25,
    isActive: true,
    isFeatured: true,
    category: {
      id: '1',
      slug: 'skincare',
      nameEn: 'Skincare',
      nameFa: 'مراقبت پوست',
      nameAr: 'العناية بالبشرة',
    },
    brand: {
      id: '1',
      slug: 'beauty-co',
      nameEn: 'Beauty Co',
      nameFa: 'بیوتی کو',
      nameAr: 'بيوتي كو',
      logo: '/brands/beauty-co.png',
    },
    rating: 4.8,
    reviewCount: 156,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.slug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const name = params.locale === 'fa' ? product.nameFa : 
                params.locale === 'ar' ? product.nameAr : product.nameEn;

  const siteName = params.locale === 'fa' ? 'بی لوک' : 
                   params.locale === 'ar' ? 'بيلوك' : 'Belook';

  return {
    title: `${name} - ${siteName}`,
    description: params.locale === 'fa' ? product.descriptionFa : 
                 params.locale === 'ar' ? product.descriptionAr : product.descriptionEn,
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ProductDetail product={product} locale={params.locale} />
      </main>
      <Footer />
    </div>
  );
}
