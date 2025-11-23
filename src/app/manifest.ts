import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Belook - بی لوک',
    short_name: 'Belook',
    description: 'فروشگاه آنلاین محصولات آرایشی و بهداشتی',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#e74c70',
    icons: [
      {
        src: '/icon.svg',
        sizes: '192x192 512x512',
        type: 'image/svg+xml',
      },
    ],
  };
}
