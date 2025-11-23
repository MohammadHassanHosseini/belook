'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Send,
  Search,
  MoreVertical,
  Clock,
  Check,
  CheckCheck,
  Smile,
  Paperclip,
  Star,
  Users,
  TrendingUp,
  MessageSquare,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { toPersianDigits } from '@/lib/utils/numbers';

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unread: number;
  status: 'online' | 'offline' | 'away';
  email?: string;
  phone?: string;
  tags?: string[];
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
  attachments?: string[];
}

export default function AdminChatPage() {
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'archived'>('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock users data
  const [users] = useState<ChatUser[]>([
    {
      id: '1',
      name: 'سارا احمدی',
      avatar: 'https://i.pravatar.cc/150?img=1',
      lastMessage: 'سلام، چه زمانی محصول ارسال میشه؟',
      lastMessageTime: new Date(Date.now() - 5 * 60000),
      unread: 3,
      status: 'online',
      email: 'sara@example.com',
      phone: '09123456789',
      tags: ['VIP', 'خرید قبلی']
    },
    {
      id: '2',
      name: 'محمد رضایی',
      avatar: 'https://i.pravatar.cc/150?img=12',
      lastMessage: 'ممنون از پاسخگویی سریعتون',
      lastMessageTime: new Date(Date.now() - 15 * 60000),
      unread: 0,
      status: 'away',
      email: 'mohammad@example.com',
      tags: ['خرید اول']
    },
    {
      id: '3',
      name: 'فاطمه کریمی',
      avatar: 'https://i.pravatar.cc/150?img=5',
      lastMessage: 'کد تخفیف دارید؟',
      lastMessageTime: new Date(Date.now() - 30 * 60000),
      unread: 1,
      status: 'online',
      email: 'fatemeh@example.com',
      tags: ['تخفیف']
    },
    {
      id: '4',
      name: 'علی محمدی',
      avatar: 'https://i.pravatar.cc/150?img=15',
      lastMessage: 'محصول عالی بود',
      lastMessageTime: new Date(Date.now() - 60 * 60000),
      unread: 0,
      status: 'offline'
    },
  ]);

  // Mock messages for selected user
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'سلام، من سرم ویتامین C رو سفارش دادم',
      sender: 'user',
      timestamp: new Date(Date.now() - 30 * 60000),
      status: 'read'
    },
    {
      id: '2',
      text: 'سلام! بله، سفارش شما ثبت شده و در حال آماده‌سازی هست',
      sender: 'support',
      timestamp: new Date(Date.now() - 28 * 60000),
      status: 'read'
    },
    {
      id: '3',
      text: 'چه زمانی ارسال میشه؟',
      sender: 'user',
      timestamp: new Date(Date.now() - 5 * 60000),
      status: 'read'
    },
  ]);

  // Quick responses templates
  const quickResponses = [
    '✅ سفارش شما در حال پردازش است',
    '🚚 محصول امروز ارسال می‌شود',
    '💰 کد تخفیف: SPECIAL20',
    '⏰ پاسخگویی: شنبه تا پنجشنبه 9-21',
    '📦 محصول موجود است',
    '🎁 ارسال رایگان برای خرید بالای 500 هزار تومان',
  ];

  const stats = [
    { label: 'گفتگوهای فعال', value: 12, icon: MessageSquare, color: 'from-blue-500 to-cyan-500' },
    { label: 'در انتظار پاسخ', value: 5, icon: Clock, color: 'from-orange-500 to-red-500' },
    { label: 'رضایت مشتری', value: '98%', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
    { label: 'میانگین پاسخ', value: '2 دقیقه', icon: Activity, color: 'from-purple-500 to-pink-500' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() && selectedUser) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message,
        sender: 'support',
        timestamp: new Date(),
        status: 'sent'
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate delivery status update
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
        ));
      }, 1000);
      
      // Simulate read status update
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
        ));
      }, 2000);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' ? true : 
                         filter === 'unread' ? user.unread > 0 : false;
    return matchesSearch && matchesFilter;
  });

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 1) return 'الان';
    if (minutes < 60) return `${toPersianDigits(minutes)} دقیقه پیش`;
    if (hours < 24) return `${toPersianDigits(hours)} ساعت پیش`;
    return date.toLocaleDateString('fa-IR');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-4">
      <div className="max-w-[1800px] mx-auto">
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
                پنل پشتیبانی چت
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                مدیریت و پاسخگویی به مشتریان
              </p>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <Users className="w-4 h-4 me-2" />
              مشاهده همه کاربران
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-4 bg-white dark:bg-gray-900 border-none shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-black text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="grid grid-cols-12 gap-4 h-[calc(100vh-300px)]">
          
          {/* Users List */}
          <div className="col-span-12 lg:col-span-4 bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden flex flex-col">
            
            {/* Search & Filter */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="جستجو در مکالمات..."
                  className="pr-4 pl-10"
                />
              </div>
              
              {/* Filter Tabs */}
              <div className="flex gap-2">
                {[
                  { id: 'all', label: 'همه', count: users.length },
                  { id: 'unread', label: 'خوانده نشده', count: users.filter(u => u.unread > 0).length },
                  { id: 'archived', label: 'بایگانی', count: 0 },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setFilter(tab.id as any)}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      filter === tab.id
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {tab.label} ({toPersianDigits(tab.count)})
                  </button>
                ))}
              </div>
            </div>

            {/* Users List */}
            <div className="flex-1 overflow-y-auto">
              {filteredUsers.map((user) => (
                <motion.div
                  key={user.id}
                  whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                  onClick={() => setSelectedUser(user)}
                  className={`p-4 cursor-pointer border-b border-gray-100 dark:border-gray-800 ${
                    selectedUser?.id === user.id ? 'bg-purple-50 dark:bg-purple-950/20' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative flex-shrink-0">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(user.status)} rounded-full border-2 border-white dark:border-gray-900`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-gray-900 dark:text-white truncate">
                          {user.name}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {formatTime(user.lastMessageTime)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate mb-2">
                        {user.lastMessage}
                      </p>
                      
                      <div className="flex items-center gap-2">
                        {user.tags?.map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {user.unread > 0 && (
                          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                            {toPersianDigits(user.unread)}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="col-span-12 lg:col-span-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden flex flex-col">
            
            {selectedUser ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={selectedUser.avatar}
                          alt={selectedUser.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(selectedUser.status)} rounded-full border-2 border-white dark:border-gray-900`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {selectedUser.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <span>{selectedUser.email}</span>
                          {selectedUser.phone && (
                            <>
                              <span>•</span>
                              <span>{selectedUser.phone}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost">
                        <Star className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'support' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex flex-col ${msg.sender === 'support' ? 'items-end' : 'items-start'} max-w-[70%]`}>
                        <div
                          className={`rounded-2xl px-4 py-2 ${
                            msg.sender === 'support'
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-sm'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-sm'
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                        </div>
                        <div className="flex items-center gap-1 mt-1 px-1">
                          <span className="text-xs text-gray-400">
                            {msg.timestamp.toLocaleTimeString('fa-IR', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                          {msg.sender === 'support' && msg.status && (
                            <div>
                              {msg.status === 'sent' && <Check className="w-3 h-3 text-gray-400" />}
                              {msg.status === 'delivered' && <CheckCheck className="w-3 h-3 text-gray-400" />}
                              {msg.status === 'read' && <CheckCheck className="w-3 h-3 text-blue-500" />}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Responses */}
                <div className="p-3 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">پاسخ‌های سریع:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickResponses.map((response, idx) => (
                      <button
                        key={idx}
                        onClick={() => setMessage(response)}
                        className="px-3 py-1.5 text-xs bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full border border-gray-200 dark:border-gray-700 transition-colors"
                      >
                        {response}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost">
                      <Paperclip className="w-5 h-5" />
                    </Button>
                    
                    <div className="flex-1">
                      <Input
                        ref={inputRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="پیام خود را بنویسید..."
                        className="rounded-full"
                      />
                    </div>

                    <Button size="icon" variant="ghost">
                      <Smile className="w-5 h-5" />
                    </Button>

                    <Button
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full px-6"
                    >
                      <Send className="w-4 h-4 me-2" />
                      ارسال
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              // No user selected
              <div className="flex-1 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">یک مکالمه را انتخاب کنید</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
