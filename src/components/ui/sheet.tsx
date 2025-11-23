'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: 'left' | 'right' | 'top' | 'bottom';
}

const Sheet = ({ open, onOpenChange, children }: SheetProps) => {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange?.(false)}
      />
      {children}
    </>
  );
};

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ className, side = 'right', children, ...props }, ref) => {
    const sideClasses = {
      right: 'right-0 top-0 h-full animate-in slide-in-from-right',
      left: 'left-0 top-0 h-full animate-in slide-in-from-left',
      top: 'top-0 left-0 w-full animate-in slide-in-from-top',
      bottom: 'bottom-0 left-0 w-full animate-in slide-in-from-bottom',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'fixed z-50 bg-background shadow-lg transition ease-in-out',
          sideClasses[side],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SheetContent.displayName = 'SheetContent';

export { Sheet, SheetContent };
