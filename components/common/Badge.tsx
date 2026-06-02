import { getStatusColor, getStatusText } from '@/lib/utils';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface BadgeProps {
  status: string;
  variant?: 'default' | 'with-trend';
  trend?: 'up' | 'down' | 'stable';
}

export const Badge: React.FC<BadgeProps> = ({ status, variant = 'default', trend }) => {
  const colorClass = getStatusColor(status);
  const text = getStatusText(status);

  if (variant === 'with-trend') {
    return (
      <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border ${colorClass}`}>
        {trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
        {trend === 'down' && <ArrowDownRight className="w-3 h-3" />}
        <span className="text-sm font-medium">{text}</span>
      </div>
    );
  }

  return (
    <span className={`inline-block px-3 py-1.5 rounded-lg border text-sm font-medium ${colorClass}`}>
      {text}
    </span>
  );
};
