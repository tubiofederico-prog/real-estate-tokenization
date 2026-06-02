import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, icon, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-primary-900 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={cn(
              'w-full px-4 py-2.5 border-2 rounded-lg transition-all duration-200',
              'placeholder-slate-400 text-primary-900',
              'focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600',
              'disabled:bg-slate-100 disabled:cursor-not-allowed',
              error
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-slate-300',
              icon ? 'pl-10' : '',
              className
            )}
            {...props}
          />
          {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">{icon}</div>}
        </div>
        {error && <p className="text-red-600 text-sm font-medium mt-1">{error}</p>}
        {helperText && <p className="text-slate-500 text-sm mt-1">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
