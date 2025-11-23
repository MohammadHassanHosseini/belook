import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@belook.ir' },
    update: {},
    create: {
      email: 'admin@belook.ir',
      password: hashedPassword,
      name: 'مدیر سیستم',
      role: 'SUPER_ADMIN',
      emailVerified: new Date(),
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create categories
  const categories = [
    {
      slug: 'skincare',
      nameEn: 'Skincare',
      nameFa: 'مراقبت پوست',
      nameAr: 'العناية بالبشرة',
      descriptionEn: 'Premium skincare products',
      descriptionFa: 'محصولات مراقبت پوست',
      descriptionAr: 'منتجات العناية بالبشرة الفاخرة',
      order: 1,
    },
    {
      slug: 'makeup',
      nameEn: 'Makeup',
      nameFa: 'آرایش',
      nameAr: 'المكياج',
      descriptionEn: 'Professional makeup products',
      descriptionFa: 'محصولات آرایشی حرفه‌ای',
      descriptionAr: 'منتجات مكياج احترافية',
      order: 2,
    },
    {
      slug: 'haircare',
      nameEn: 'Haircare',
      nameFa: 'مراقبت مو',
      nameAr: 'العناية بالشعر',
      descriptionEn: 'Hair care essentials',
      descriptionFa: 'محصولات مراقبت مو',
      descriptionAr: 'أساسيات العناية بالشعر',
      order: 3,
    },
    {
      slug: 'fragrance',
      nameEn: 'Fragrance',
      nameFa: 'عطر و ادکلن',
      nameAr: 'العطور',
      descriptionEn: 'Luxury fragrances',
      descriptionFa: 'عطرهای لوکس',
      descriptionAr: 'عطور فاخرة',
      order: 4,
    },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log('✅ Categories created');

  // Create brands
  const brands = [
    {
      slug: 'la-roche-posay',
      nameEn: 'La Roche-Posay',
      nameFa: 'لاروش پوزای',
      nameAr: 'لاروش بوزيه',
      descriptionEn: 'Dermatological beauty',
      descriptionFa: 'زیبایی درماتولوژیک',
      descriptionAr: 'جمال الأمراض الجلدية',
    },
    {
      slug: 'loreal',
      nameEn: "L'Oréal",
      nameFa: 'لورآل',
      nameAr: 'لوريال',
      descriptionEn: 'Because you\'re worth it',
      descriptionFa: 'چون ارزشش را دارید',
      descriptionAr: 'لأنك تستحقين ذلك',
    },
    {
      slug: 'vichy',
      nameEn: 'Vichy',
      nameFa: 'ویشی',
      nameAr: 'فيشي',
      descriptionEn: 'Health through water',
      descriptionFa: 'سلامت از طریق آب',
      descriptionAr: 'الصحة من خلال الماء',
    },
  ];

  for (const brand of brands) {
    await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: {},
      create: brand,
    });
  }
  console.log('✅ Brands created');

  // Get category and brand IDs
  const skincareCategory = await prisma.category.findUnique({
    where: { slug: 'skincare' },
  });
  const makeupCategory = await prisma.category.findUnique({
    where: { slug: 'makeup' },
  });
  const lorealBrand = await prisma.brand.findUnique({
    where: { slug: 'loreal' },
  });

  // Create sample products
  if (skincareCategory && lorealBrand) {
    const products = [
      {
        slug: 'vitamin-c-serum',
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
          'https://images.unsplash.com/photo-1620916297803-be2bd5580e4b?w=800',
          'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800',
        ],
        thumbnail: 'https://images.unsplash.com/photo-1620916297803-be2bd5580e4b?w=400',
        stock: 50,
        categoryId: skincareCategory.id,
        brandId: lorealBrand.id,
        isFeatured: true,
        isNewArrival: true,
      },
      {
        slug: 'hyaluronic-acid-moisturizer',
        sku: 'BLK-002',
        nameEn: 'Hyaluronic Acid Moisturizer',
        nameFa: 'کرم مرطوب کننده هیالورونیک اسید',
        nameAr: 'مرطب حمض الهيالورونيك',
        descriptionEn: 'Deep hydration moisturizer with hyaluronic acid.',
        descriptionFa: 'کرم مرطوب کننده عمیق با هیالورونیک اسید.',
        descriptionAr: 'مرطب ترطيب عميق مع حمض الهيالورونيك.',
        price: 380000,
        comparePrice: 480000,
        images: [
          'https://images.unsplash.com/photo-1556228852-80f3c5145c7d?w=800',
        ],
        thumbnail: 'https://images.unsplash.com/photo-1556228852-80f3c5145c7d?w=400',
        stock: 35,
        categoryId: skincareCategory.id,
        brandId: lorealBrand.id,
        isFeatured: true,
        isBestSeller: true,
      },
    ];

    for (const product of products) {
      await prisma.product.upsert({
        where: { slug: product.slug },
        update: {},
        create: product,
      });
    }
    console.log('✅ Sample products created');
  }

  // Create settings
  const settings = [
    {
      key: 'site_name_fa',
      value: 'بی لوک',
      type: 'string',
      group: 'general',
    },
    {
      key: 'site_name_en',
      value: 'Belook',
      type: 'string',
      group: 'general',
    },
    {
      key: 'site_name_ar',
      value: 'بي لوك',
      type: 'string',
      group: 'general',
    },
    {
      key: 'contact_email',
      value: 'info@belook.ir',
      type: 'string',
      group: 'contact',
    },
    {
      key: 'contact_phone',
      value: '021-12345678',
      type: 'string',
      group: 'contact',
    },
    {
      key: 'free_shipping_threshold',
      value: '500000',
      type: 'number',
      group: 'shipping',
    },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }
  console.log('✅ Settings created');

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
