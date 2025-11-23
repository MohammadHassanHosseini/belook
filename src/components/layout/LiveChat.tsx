'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  X,
  Send,
  Paperclip,
  Smile,
  CheckCheck,
  Minimize2,
  Maximize2,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
  avatar?: string;
  name?: string;
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'سلام! به بی‌لوک خوش آمدید 👋',
      sender: 'support',
      timestamp: new Date(),
      avatar: 'https://i.pravatar.cc/150?img=10',
      name: 'مریم'
    },
    {
      id: '2',
      text: 'چطور می‌تونم کمکتون کنم؟',
      sender: 'support',
      timestamp: new Date(),
      avatar: 'https://i.pravatar.cc/150?img=10',
      name: 'مریم'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickReplies = [
    { id: 1, text: '🛍️ محصولات', icon: '🛍️' },
    { id: 2, text: '💰 قیمت‌ها', icon: '💰' },
    { id: 3, text: '🚚 ارسال', icon: '🚚' },
    { id: 4, text: '🎁 تخفیف‌ها', icon: '🎁' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message,
        sender: 'user',
        timestamp: new Date(),
        status: 'sent'
      };

      setMessages([...messages, newMessage]);
      setMessage('');

      // Simulate support response
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const supportMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'ممنون از پیامتون! یکی از همکاران ما بزودی پاسخ می‌دن 😊',
          sender: 'support',
          timestamp: new Date(),
          avatar: 'https://i.pravatar.cc/150?img=10',
          name: 'مریم'
        };
        setMessages(prev => [...prev, supportMessage]);
        
        if (!isOpen) {
          setUnreadCount(prev => prev + 1);
        }
      }, 2000);
    }
  };

  const handleQuickReply = (text: string) => {
    setMessage(text);
    inputRef.current?.focus();
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(true)}
              className="relative group"
            >
              {/* Pulse Ring */}
              <motion.div
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
              />

              {/* Main Button */}
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl">
                <MessageCircle className="w-8 h-8 text-white" />
                
                {/* Unread Badge */}
                {unreadCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
                  >
                    {unreadCount}
                  </motion.div>
                )}
              </div>

              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap px-4 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-xl pointer-events-none"
              >
                گفتگو با پشتیبانی
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
              </motion.div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              height: isMinimized ? 'auto' : '600px'
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 w-[380px] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden z-50 border border-gray-200 dark:border-gray-800 flex flex-col"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-4">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }} />
              </div>

              <div className="relative flex items-center justify-between">
                {/* Support Info */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src="https://i.pravatar.cc/150?img=10"
                      alt="Support"
                      className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
                    />
                    {/* Online Status */}
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">پشتیبانی بی‌لوک</h3>
                    <div className="flex items-center gap-1 text-white/90 text-xs">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span>آنلاین هستیم</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="text-white hover:bg-white/20 rounded-full"
                  >
                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Content - Only show when not minimized */}
            {!isMinimized && (
              <>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
                  {messages.map((msg, index) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} gap-2`}
                    >
                      {msg.sender === 'support' && msg.avatar && (
                        <img
                          src={msg.avatar}
                          alt={msg.name}
                          className="w-8 h-8 rounded-full flex-shrink-0"
                        />
                      )}

                      <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} max-w-[75%]`}>
                        {msg.sender === 'support' && msg.name && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 mb-1 px-1">
                            {msg.name}
                          </span>
                        )}
                        
                        <div
                          className={`rounded-2xl px-4 py-2 ${
                            msg.sender === 'user'
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
                          {msg.sender === 'user' && msg.status && (
                            <CheckCheck className={`w-3 h-3 ${
                              msg.status === 'read' ? 'text-blue-500' : 'text-gray-400'
                            }`} />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2"
                    >
                      <img
                        src="https://i.pravatar.cc/150?img=10"
                        alt="Support"
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3 rounded-bl-sm">
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ y: [0, -5, 0] }}
                              transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.1
                              }}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                {messages.length <= 2 && (
                  <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-800">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">پاسخ‌های سریع:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickReplies.map((reply) => (
                        <motion.button
                          key={reply.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleQuickReply(reply.text)}
                          className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                        >
                          {reply.text}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-full flex-shrink-0"
                    >
                      <Paperclip className="w-5 h-5" />
                    </Button>
                    
                    <div className="flex-1 relative">
                      <Input
                        ref={inputRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="پیام خود را بنویسید..."
                        className="rounded-full border-2 pr-10"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full"
                      >
                        <Smile className="w-5 h-5" />
                      </Button>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                    >
                      <Send className="w-5 h-5 text-white" />
                    </motion.button>
                  </div>

                  {/* Powered By */}
                  <div className="flex items-center justify-center gap-1 mt-2 text-xs text-gray-400">
                    <Sparkles className="w-3 h-3" />
                    <span>پشتیبانی هوشمند بی‌لوک</span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
