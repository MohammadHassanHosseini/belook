'use client';

import { useState } from 'react';
import { 
  Share2, 
  Instagram, 
  Send, 
  MessageCircle, 
  Facebook, 
  Twitter, 
  Linkedin,
  Copy,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface ShareButtonsProps {
  productName: string;
  productUrl: string;
  productImage?: string;
}

export default function ShareButtons({ productName, productUrl, productImage }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  
  const shareText = `${productName} - بی لوک`;
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${productUrl}` : productUrl;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    toast.success('لینک کپی شد! ✓');
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    {
      name: 'تلگرام',
      icon: Send,
      color: 'text-blue-500',
      url: `https://t.me/share/url?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'واتساپ',
      icon: MessageCircle,
      color: 'text-green-600',
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + fullUrl)}`,
    },
    {
      name: 'فیسبوک',
      icon: Facebook,
      color: 'text-blue-600',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
    },
    {
      name: 'توییتر',
      icon: Twitter,
      color: 'text-sky-500',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(fullUrl)}`,
    },
    {
      name: 'لینکدین',
      icon: Linkedin,
      color: 'text-blue-700',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
    },
  ];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text: shareText,
          url: fullUrl,
        });
      } catch (error) {
        // کاربر cancel کرد یا مشکلی پیش آمد
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="w-4 h-4" />
          اشتراک‌گذاری
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5">
          <p className="text-sm font-semibold">اشتراک‌گذاری در:</p>
        </div>
        <DropdownMenuSeparator />
        
        {shareLinks.map((link) => {
          const Icon = link.icon;
          return (
            <DropdownMenuItem
              key={link.name}
              onClick={() => window.open(link.url, '_blank', 'width=600,height=400')}
              className="cursor-pointer"
            >
              <Icon className={`w-4 h-4 me-2 ${link.color}`} />
              {link.name}
            </DropdownMenuItem>
          );
        })}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
          {copied ? (
            <>
              <Check className="w-4 h-4 me-2 text-green-500" />
              <span className="text-green-500">کپی شد!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 me-2" />
              کپی لینک
            </>
          )}
        </DropdownMenuItem>
        
        {/* Native Share API (برای موبایل) */}
        {typeof window !== 'undefined' && 'share' in navigator && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleShare} className="cursor-pointer">
              <Share2 className="w-4 h-4 me-2" />
              اشتراک‌گذاری...
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
