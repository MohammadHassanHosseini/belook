'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { 
  Instagram, 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Youtube, 
  Linkedin, 
  Twitter,
  MessageCircle,
  Hash,
  Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toPersianDigits } from '@/lib/utils/numbers';
import { useSettings } from '@/contexts/SettingsContext';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const { settings } = useSettings();

  return (
    <footer className="border-t bg-secondary/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.aboutUs')}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t('footer.aboutText')}
            </p>
            <div className="flex flex-wrap gap-2">
              {settings.instagram && (
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="rounded-full hover:bg-pink-500 hover:text-white transition-colors"
                  asChild
                >
                  <a href={`https://instagram.com/${settings.instagram}`} target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {settings.telegram && (
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="rounded-full hover:bg-blue-500 hover:text-white transition-colors"
                  asChild
                >
                  <a href={`https://t.me/${settings.telegram.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                    <Send className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {settings.whatsapp && (
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="rounded-full hover:bg-green-500 hover:text-white transition-colors"
                  asChild
                >
                  <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {settings.facebook && (
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                  asChild
                >
                  <a href={`https://facebook.com/${settings.facebook}`} target="_blank" rel="noopener noreferrer">
                    <Facebook className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {settings.youtube && (
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="rounded-full hover:bg-red-600 hover:text-white transition-colors"
                  asChild
                >
                  <a href={`https://youtube.com/${settings.youtube}`} target="_blank" rel="noopener noreferrer">
                    <Youtube className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {settings.linkedin && (
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="rounded-full hover:bg-blue-700 hover:text-white transition-colors"
                  asChild
                >
                  <a href={`https://linkedin.com/in/${settings.linkedin}`} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {settings.twitter && (
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="rounded-full hover:bg-sky-500 hover:text-white transition-colors"
                  asChild
                >
                  <a href={`https://twitter.com/${settings.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {settings.rubika && (
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="rounded-full hover:bg-purple-600 hover:text-white transition-colors"
                  asChild
                >
                  <a href={`https://rubika.ir/${settings.rubika}`} target="_blank" rel="noopener noreferrer">
                    <Hash className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {settings.eitaa && (
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="rounded-full hover:bg-orange-600 hover:text-white transition-colors"
                  asChild
                >
                  <a href={`https://eitaa.com/${settings.eitaa.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                    <Smartphone className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/about`} className="text-sm text-muted-foreground hover:text-primary">
                  {t('common.about')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/products`} className="text-sm text-muted-foreground hover:text-primary">
                  {t('common.products')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/brands`} className="text-sm text-muted-foreground hover:text-primary">
                  {t('common.brands')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-sm text-muted-foreground hover:text-primary">
                  {t('common.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.customerService')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/faq`} className="text-sm text-muted-foreground hover:text-primary">
                  {t('footer.faq')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/shipping`} className="text-sm text-muted-foreground hover:text-primary">
                  {t('footer.shippingInfo')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/returns`} className="text-sm text-muted-foreground hover:text-primary">
                  {t('footer.returnPolicy')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy`} className="text-sm text-muted-foreground hover:text-primary">
                  {t('footer.privacyPolicy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.newsletter')}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t('footer.newsletterText')}
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="flex-1"
              />
              <Button>{t('footer.subscribe')}</Button>
            </div>
            
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span dir="ltr">{toPersianDigits('021-12345678')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@belook.ir</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {toPersianDigits(new Date().getFullYear().toString())} {locale === 'fa' ? 'بی لوک' : 'Belook'}. {t('footer.allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
}
