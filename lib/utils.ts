import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency
export const formatCurrency = (value: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Format percentage
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

// Format number
export const formatNumber = (value: number, decimals: number = 0): string => {
  return new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

// Format date
export const formatDate = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('es-AR');
};

// Format date with month name
export const formatDateLong = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Get status color based on status type
export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    'active': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'pending': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'completed': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'in-execution': 'bg-cyan-50 text-cyan-700 border-cyan-200',
    'open': 'bg-cyan-50 text-cyan-700 border-cyan-200',
    'upcoming': 'bg-blue-50 text-blue-700 border-blue-200',
    'funded': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'closed': 'bg-slate-100 text-slate-700 border-slate-200',
    'failed': 'bg-red-50 text-red-700 border-red-200',
    'blocked': 'bg-red-50 text-red-700 border-red-200',
    'verified': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'rejected': 'bg-red-50 text-red-700 border-red-200',
  };
  return colors[status] || 'bg-slate-100 text-slate-700 border-slate-200';
};

// Get status badge text
export const getStatusText = (status: string): string => {
  const texts: Record<string, string> = {
    'active': 'Activo',
    'pending': 'Pendiente',
    'completed': 'Completado',
    'in-execution': 'En Ejecución',
    'open': 'Abierto',
    'upcoming': 'Próximo',
    'funded': 'Financiado',
    'closed': 'Cerrado',
    'failed': 'Fallido',
    'blocked': 'Bloqueado',
    'verified': 'Verificado',
    'rejected': 'Rechazado',
  };
  return texts[status] || status;
};

// Get risk level color and text
export const getRiskConfig = (level: string): { color: string; text: string } => {
  const configs: Record<string, { color: string; text: string }> = {
    'low': { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', text: 'Bajo' },
    'medium': { color: 'bg-yellow-50 text-yellow-700 border-yellow-200', text: 'Medio' },
    'high': { color: 'bg-red-50 text-red-700 border-red-200', text: 'Alto' },
  };
  return configs[level] || { color: 'bg-slate-100 text-slate-700 border-slate-200', text: 'Desconocido' };
};

// Truncate string
export const truncate = (str: string, length: number = 50): string => {
  return str.length > length ? str.substring(0, length) + '...' : str;
};

// Get initials from name
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Generate avatar colors
export const getAvatarColor = (index: number): string => {
  const colors = [
    'bg-blue-500',
    'bg-cyan-500',
    'bg-emerald-500',
    'bg-yellow-500',
    'bg-orange-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-pink-500',
  ];
  return colors[index % colors.length];
};

// Calculate percentage change
export const calculateChange = (current: number, previous: number): number => {
  return ((current - previous) / previous) * 100;
};

// Get trending direction
export const getTrendingDirection = (current: number, previous: number): 'up' | 'down' | 'stable' => {
  if (current > previous) return 'up';
  if (current < previous) return 'down';
  return 'stable';
};

// Format large numbers (1M, 1K, etc)
export const formatCompact = (value: number): string => {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + 'M';
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(1) + 'K';
  }
  return value.toFixed(0);
};

// Validate email
export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Get project progress color
export const getProgressColor = (progress: number): string => {
  if (progress >= 75) return 'bg-emerald-500';
  if (progress >= 50) return 'bg-cyan-500';
  if (progress >= 25) return 'bg-yellow-500';
  return 'bg-red-500';
};

// Calculate investment returns
export const calculateInvestmentReturns = (
  investmentAmount: number,
  returnPercentage: number,
  months: number
): number => {
  const monthlyRate = returnPercentage / 12 / 100;
  return investmentAmount * (Math.pow(1 + monthlyRate, months) - 1);
};
