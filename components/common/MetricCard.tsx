import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  backgroundColor?: string;
  valueColor?: string;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  icon,
  trend,
  trendValue,
  backgroundColor = 'bg-white',
  valueColor = 'text-primary-900',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200',
        backgroundColor,
        onClick ? 'cursor-pointer hover:border-slate-300' : ''
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-slate-600 font-medium">{label}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={cn('text-3xl font-bold', valueColor)}>{value}</span>
            {unit && <span className="text-sm text-slate-500">{unit}</span>}
          </div>
          {trendValue && (
            <div className="mt-2 flex items-center gap-1">
              {trend === 'up' && (
                <>
                  <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-emerald-600 font-medium">{trendValue}</span>
                </>
              )}
              {trend === 'down' && (
                <>
                  <ArrowDownRight className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-red-600 font-medium">{trendValue}</span>
                </>
              )}
              {trend === 'neutral' && (
                <span className="text-sm text-slate-500 font-medium">{trendValue}</span>
              )}
            </div>
          )}
        </div>
        {icon && <div className="text-primary-600">{icon}</div>}
      </div>
    </div>
  );
};
