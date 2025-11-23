'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Shield, Key } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function SecurityPage() {
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleChangePassword = () => {
    if (passwords.new !== passwords.confirm) {
      toast.error('رمز عبور جدید و تکرار آن مطابقت ندارند');
      return;
    }
    toast.success('رمز عبور با موفقیت تغییر کرد');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-6 h-6" />
            تغییر رمز عبور
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current">رمز عبور فعلی</Label>
            <Input
              id="current"
              type="password"
              value={passwords.current}
              onChange={(e) => setPasswords({...passwords, current: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new">رمز عبور جدید</Label>
            <Input
              id="new"
              type="password"
              value={passwords.new}
              onChange={(e) => setPasswords({...passwords, new: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm">تکرار رمز عبور جدید</Label>
            <Input
              id="confirm"
              type="password"
              value={passwords.confirm}
              onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
            />
          </div>
          <Button onClick={handleChangePassword} className="w-full gap-2">
            <Key className="w-4 h-4" />
            تغییر رمز عبور
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-6 h-6" />
            تأیید دو مرحله‌ای
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            برای امنیت بیشتر حساب خود، تأیید دو مرحله‌ای را فعال کنید
          </p>
          <Button variant="outline" className="w-full">
            فعال‌سازی
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
