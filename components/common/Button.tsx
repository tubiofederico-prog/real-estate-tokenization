import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  asLink?: boolean;
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      asLink,
      href,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'bg-primary-700 text-white hover:bg-primary-800 shadow-md hover:shadow-lg',
      secondary: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg',
      outline: 'border-2 border-primary-700 text-primary-700 hover:bg-primary-50',
      ghost: 'text-primary-700 hover:bg-primary-50',
      danger: 'bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg',
    };

    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    if (asLink && href) {
      return (
        <a
          href={href}
          className={cn(baseStyles, variants[variant], sizes[size], className)}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
