
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ children, className = '' }, ref) => (
    <div ref={ref} className={`max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  )
);

Container.displayName = 'Container';

export const Section = React.forwardRef<HTMLElement, LayoutProps>(
  ({ children, className = '' }, ref) => (
    <section ref={ref} className={`py-16 md:py-24 ${className}`}>
      {children}
    </section>
  )
);

Section.displayName = 'Section';

export const Grid: React.FC<{ cols?: string; gap?: string; children: React.ReactNode; className?: string }> = ({ 
  cols = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3', 
  gap = 'gap-8', 
  children, 
  className = '' 
}) => (
  <div className={`grid ${cols} ${gap} ${className}`}>
    {children}
  </div>
);

export const Card: React.FC<LayoutProps> = ({ children, className = '' }) => (
  <div className={`
    bg-white/5 backdrop-blur-sm border border-white/10 
    rounded-2xl p-8 hover:bg-white/10 
    transition-all duration-300 hover:scale-[1.02]
    hover:shadow-2xl hover:shadow-purple-500/10
    ${className}
  `}>
    {children}
  </div>
);
