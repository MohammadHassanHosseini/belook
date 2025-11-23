'use client';

import { motion } from 'framer-motion';
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function InstagramFeed() {
  const posts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=500&fit=crop',
      likes: 1234,
      comments: 89
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&h=500&fit=crop',
      likes: 987,
      comments: 56
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&h=500&fit=crop',
      likes: 2156,
      comments: 134
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop',
      likes: 876,
      comments: 45
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop',
      likes: 1543,
      comments: 98
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&h=500&fit=crop',
      likes: 1098,
      comments: 67
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-950 dark:via-purple-950/10 dark:to-gray-950">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <Instagram className="w-8 h-8 text-pink-600" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              ما را در اینستاگرام دنبال کنید
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
            الهام بگیرید و با جدیدترین محصولات آشنا شوید
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-xl"
          >
            <a href="https://instagram.com/belook" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-5 h-5 me-2" />
              دنبال کنید @belook
              <ExternalLink className="w-4 h-4 ms-2" />
            </a>
          </Button>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer hover:scale-[1.02] hover:-translate-y-1 transition-transform duration-300 will-change-transform"
            >
              {/* Image */}
              <img
                src={post.image}
                alt={`Instagram post ${post.id}`}
                className="w-full h-full object-cover transition-all duration-500"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-4 text-white">
                    <div className="flex items-center gap-1">
                      <Heart className="w-5 h-5 fill-white" />
                      <span className="text-sm font-bold">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm font-bold">{post.comments}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instagram Icon */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center">
                  <Instagram className="w-5 h-5 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
