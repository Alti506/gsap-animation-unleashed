
import React from 'react';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'button';
  children: React.ReactNode;
  className?: string;
}

const Typography: React.FC<TypographyProps> = ({ variant = 'body', children, className = '' }) => {
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

  const Tag = variant.startsWith('h') ? variant as keyof JSX.IntrinsicElements : 'p';

  return (
    <Tag className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </Tag>
  );
};

export default Typography;
