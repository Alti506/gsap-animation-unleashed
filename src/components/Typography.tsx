
import React, { forwardRef } from 'react';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'button';
  children: React.ReactNode;
  className?: string;
}

const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ variant = 'body', children, className = '' }, ref) => {
    const baseClasses = 'font-inter leading-relaxed';
    
    const variants = {
      h1: 'text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]',
      h2: 'text-3xl md:text-5xl font-semibold tracking-tight leading-[1.2]',
      h3: 'text-2xl md:text-3xl font-semibold tracking-tight leading-[1.3]',
      h4: 'text-xl md:text-2xl font-medium tracking-tight leading-[1.4]',
      body: 'text-base md:text-lg leading-[1.6]',
      caption: 'text-sm md:text-base leading-[1.5] opacity-80',
      button: 'text-sm md:text-base font-medium tracking-wide'
    };

    const getTag = (): keyof JSX.IntrinsicElements => {
      if (variant === 'h1' || variant === 'h2' || variant === 'h3' || variant === 'h4') {
        return variant;
      }
      return 'p';
    };

    const Tag = getTag();

    return (
      <Tag 
        ref={ref as any}
        className={`${baseClasses} ${variants[variant]} ${className}`}
      >
        {children}
      </Tag>
    );
  }
);

Typography.displayName = 'Typography';

export default Typography;
