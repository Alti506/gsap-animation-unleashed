
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface EnhancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ variant = 'primary', size = 'md', children, className, ...props }, ref) => {
    const baseClasses = `
      inline-flex items-center justify-center font-medium 
      transition-all duration-200 ease-out
      focus:outline-none focus:ring-2 focus:ring-offset-2
      active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none
      rounded-xl border-0
    `;

    const variants = {
      primary: `
        bg-gradient-to-r from-indigo-600 to-purple-600 
        hover:from-indigo-700 hover:to-purple-700
        text-white shadow-lg hover:shadow-xl
        focus:ring-indigo-500/25
      `,
      secondary: `
        bg-gray-100 hover:bg-gray-200 
        text-gray-900 shadow-sm hover:shadow-md
        focus:ring-gray-500/25
      `,
      outline: `
        border-2 border-gray-300 hover:border-gray-400 
        bg-transparent hover:bg-gray-50
        text-gray-700 hover:text-gray-900
        focus:ring-gray-500/25
      `,
      ghost: `
        bg-transparent hover:bg-gray-100
        text-gray-600 hover:text-gray-900
        focus:ring-gray-500/25
      `
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    };

    return (
      <button
        ref={ref}
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

EnhancedButton.displayName = 'EnhancedButton';

export default EnhancedButton;
