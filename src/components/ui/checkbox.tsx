import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

export function Checkbox({ checked, onCheckedChange, className }: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        'h-5 w-5 rounded border-2 border-primary transition-colors',
        checked ? 'bg-primary' : 'bg-background',
        className
      )}
    >
      {checked && <Check className="h-4 w-4 text-primary-foreground" />}
    </button>
  );
}
