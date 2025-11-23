'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Crown,
  Edit,
  Save,
  Camera,
  Shield,
  Award,
  TrendingUp,
  Activity,
  Eye,
  MessageSquare,
  Share2,
  MoreVertical,
  Globe,
  Instagram,
  Linkedin,
  Github,
  Clock,
  CheckCircle,
  Star,
  Zap,
  Target,
  Briefcase,
  X,
  Sparkles,
  Link as LinkIcon
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { toPersianDigits } from '@/lib/utils/numbers';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  const [profile, setProfile] = useState({
    name: 'مدیر سیستم',
    title: 'مدیر کل فروشگاه بی لوک',
    email: 'admin@belook.com',
    phone: '09123456789',
    location: 'تهران، ایران',
    address: 'تهران، خیابان ولیعصر، پلاک ۱۲۳',
    joinedDate: '۱۴۰۲/۰۵/۱۵',
    birthDate: '۱۳۶۵/۰۳/۱۵',
    role: 'SUPER_ADMIN',
    bio: 'مدیر کل و بنیانگذار فروشگاه آنلاین بی لوک. متخصص در تجارت الکترونیک و مدیریت کسب و کار دیجیتال با بیش از ۱۰ سال تجربه.',
    website: 'https://belook.com',
    social: {
      instagram: '@belook_official',
      linkedin: 'company/belook',
      github: 'belook'
    }
  });

  const stats = [
    { icon: Activity, label: 'کل فعالیت‌ها', value: '۱,۲۳۴', change: '+۱۲%', color: 'from-blue-500 to-cyan-500' },
    { icon: Eye, label: 'بازدید پروفایل', value: '۸۹۲', change: '+۲۵%', color: 'from-green-500 to-emerald-500' },
    { icon: Award, label: 'دستاوردها', value: '۱۵', change: '+۳', color: 'from-purple-500 to-pink-500' },
    { icon: Shield, label: 'امتیاز اعتبار', value: '۹۸٪', change: '+۵%', color: 'from-orange-500 to-red-500' },
  ];

  const recentActivities = [
    { id: 1, action: 'ویرایش محصول', item: 'سرم ویتامین C', time: '۵ دقیقه پیش', icon: Edit, color: 'bg-blue-500' },
    { id: 2, action: 'پردازش سفارش', item: '#۱۲۳۴۵', time: '۱۵ دقیقه پیش', icon: CheckCircle, color: 'bg-green-500' },
    { id: 3, action: 'پاسخ به نظر', item: 'کرم مرطوب کننده', time: '۱ ساعت پیش', icon: MessageSquare, color: 'bg-purple-500' },
    { id: 4, action: 'مشاهده گزارش', item: 'فروش ماهانه', time: '۲ ساعت پیش', icon: Eye, color: 'bg-orange-500' },
  ];

  const achievements = [
    { icon: Crown, title: 'مدیر برتر', description: 'مدیریت موفق پروژه‌ها', color: 'text-yellow-500', progress: 100 },
    { icon: Target, title: 'هدف‌گذار', description: 'رسیدن به ۱۰۰ هدف', color: 'text-blue-500', progress: 85 },
    { icon: Zap, title: 'پرانرژی', description: 'فعالیت مستمر', color: 'text-purple-500', progress: 92 },
    { icon: Star, title: 'ستاره درخشان', description: 'امتیاز عالی', color: 'text-orange-500', progress: 98 },
  ];

  const handleSave = () => {
    toast.success('اطلاعات پروفایل با موفقیت ذخیره شد');
    setIsEditing(false);
  };

  const handleCoverUpload = () => {
    toast.success('عکس کاور آپلود شد');
  };

  const handleAvatarUpload = () => {
    toast.success('عکس پروفایل آپلود شد');
  };

  return (
    <div className="space-y-6">
      {/* Cover & Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <Card className="border-0 shadow-2xl overflow-hidden">
          {/* Cover Photo */}
          <div className="relative h-48 md:h-64 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 overflow-hidden group">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:24px_24px]" />
            <motion.div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Cover Actions */}
            <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant="secondary"
                className="gap-2 backdrop-blur-md bg-white/20 text-white border-white/30 hover:bg-white/30"
                onClick={handleCoverUpload}
              >
                <Camera className="w-4 h-4" />
                تغییر کاور
              </Button>
            </div>
          </div>

          <CardContent className="relative px-6 pb-6">
            {/* Avatar & Info */}
            <div className="flex flex-col md:flex-row gap-6 -mt-16 md:-mt-20">
              {/* Avatar */}
              <div className="relative group/avatar shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-5xl md:text-6xl font-black shadow-2xl border-4 border-background">
                  {profile.name.charAt(0)}
                </div>
                <button 
                  onClick={handleAvatarUpload}
                  className="absolute bottom-2 right-2 p-3 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:scale-110 transition-transform opacity-0 group-hover/avatar:opacity-100"
                >
                  <Camera className="w-5 h-5" />
                </button>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-background rounded-full" />
              </div>

              {/* Info */}
              <div className="flex-1 mt-4 md:mt-8">
                <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-black mb-2 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                      {profile.name}
                    </h1>
                    <p className="text-lg text-muted-foreground mb-3">{profile.title}</p>
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 gap-1 px-3 py-1">
                        <Crown className="w-4 h-4" />
                        مدیر کل
                      </Badge>
                      <Badge variant="secondary" className="gap-1 px-3 py-1">
                        <Calendar className="w-4 h-4" />
                        عضو از {profile.joinedDate}
                      </Badge>
                      <Badge variant="outline" className="gap-1 px-3 py-1">
                        <MapPin className="w-4 h-4" />
                        {profile.location}
                      </Badge>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setIsEditing(!isEditing)}
                      variant={isEditing ? 'outline' : 'default'}
                      className="gap-2"
                    >
                      {isEditing ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                      {isEditing ? 'انصراف' : 'ویرایش پروفایل'}
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-muted-foreground leading-relaxed max-w-3xl mb-4">
                  {profile.bio}
                </p>

                {/* Social Links */}
                <div className="flex flex-wrap gap-3">
                  {profile.website && (
                    <Button variant="outline" size="sm" className="gap-2">
                      <Globe className="w-4 h-4" />
                      وب‌سایت
                    </Button>
                  )}
                  {profile.social.instagram && (
                    <Button variant="outline" size="sm" className="gap-2">
                      <Instagram className="w-4 h-4" />
                      اینستاگرام
                    </Button>
                  )}
                  {profile.social.linkedin && (
                    <Button variant="outline" size="sm" className="gap-2">
                      <Linkedin className="w-4 h-4" />
                      لینکدین
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="text-xs gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {stat.change}
                    </Badge>
                  </div>
                  <div className="text-3xl font-black mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Tabs */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {['overview', 'activity', 'achievements'].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab(tab)}
                className="shrink-0"
              >
                {tab === 'overview' && 'نمای کلی'}
                {tab === 'activity' && 'فعالیت‌ها'}
                {tab === 'achievements' && 'دستاوردها'}
              </Button>
            ))}
          </div>
        </CardHeader>
      </Card>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
      {/* Profile Form */}
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">اطلاعات شخصی</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">نام و نام خانوادگی</Label>
              <div className="relative">
                <User className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  disabled={!isEditing}
                  className="pr-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">ایمیل</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  disabled={!isEditing}
                  className="pr-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">شماره تماس</Label>
              <div className="relative">
                <Phone className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  disabled={!isEditing}
                  className="pr-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">آدرس</Label>
              <div className="relative">
                <MapPin className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="address"
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  disabled={!isEditing}
                  className="pr-10"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">بیوگرافی</Label>
            <textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              disabled={!isEditing}
              rows={4}
              className="w-full px-3 py-2 rounded-lg border bg-background resize-none disabled:opacity-50"
            />
          </div>

          {isEditing && (
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                انصراف
              </Button>
              <Button onClick={handleSave} className="gap-2">
                <Save className="w-4 h-4" />
                ذخیره تغییرات
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
          </motion.div>
        )}

        {activeTab === 'activity' && (
          <motion.div
            key="activity"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  فعالیت‌های اخیر
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start gap-4 p-4 rounded-xl hover:bg-secondary transition-colors"
                      >
                        <div className={`w-10 h-10 rounded-xl ${activity.color} flex items-center justify-center text-white shrink-0`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold mb-1">{activity.action}</h4>
                          <p className="text-sm text-muted-foreground mb-1">{activity.item}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {activity.time}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === 'achievements' && (
          <motion.div
            key="achievements"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  دستاوردها
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center ${achievement.color} shadow-lg`}>
                                <Icon className="w-7 h-7" />
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                {toPersianDigits(achievement.progress.toString())}%
                              </Badge>
                            </div>
                            <h4 className="font-bold text-lg mb-1">{achievement.title}</h4>
                            <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${achievement.progress}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
