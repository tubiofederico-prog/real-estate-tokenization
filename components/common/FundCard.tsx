import { TrendingUp, Users } from 'lucide-react';
import { Button } from './Button';
import { Badge } from './Badge';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { Fund } from '@/lib/types';

interface FundCardProps {
  fund: Fund;
  onInvest?: () => void;
  onViewDetails?: () => void;
  showAction?: boolean;
}

export const FundCard: React.FC<FundCardProps> = ({
  fund,
  onInvest,
  onViewDetails,
  showAction = true,
}) => {
  const raisedPercent = (fund.capitalRaised / fund.capitalTarget) * 100;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-primary-900 mb-1">{fund.name}</h3>
          <p className="text-sm text-slate-600 line-clamp-2">{fund.description}</p>
        </div>
        <Badge status={fund.status} />
      </div>

      {/* Risk & Duration */}
      <div className="flex items-center gap-4 mb-4 text-sm">
        <div>
          <p className="text-slate-500 text-xs font-medium">Riesgo</p>
          <Badge status={fund.riskLevel} />
        </div>
        <div>
          <p className="text-slate-500 text-xs font-medium">Plazo</p>
          <p className="text-primary-900 font-bold">{fund.durationMonths} meses</p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-slate-50 rounded-lg text-sm">
        <div>
          <p className="text-slate-600 text-xs font-medium mb-1">Capital Recaudado</p>
          <p className="text-primary-900 font-bold">{formatCurrency(fund.capitalRaised, 'USD')}</p>
        </div>
        <div>
          <p className="text-slate-600 text-xs font-medium mb-1">Rentabilidad Estimada</p>
          <p className="text-emerald-600 font-bold">
            {formatPercentage(fund.estimatedReturn.min)}-{formatPercentage(fund.estimatedReturn.max)}
          </p>
        </div>
        <div>
          <p className="text-slate-600 text-xs font-medium mb-1">Inversores</p>
          <div className="flex items-center gap-1 text-primary-900 font-bold">
            <Users className="w-4 h-4 text-emerald-600" />
            {fund.investorsCount}
          </div>
        </div>
        <div>
          <p className="text-slate-600 text-xs font-medium mb-1">Progreso</p>
          <p className="text-primary-900 font-bold">{Math.round(raisedPercent)}%</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(raisedPercent, 100)}%` }}
          />
        </div>
      </div>

      {/* Composition */}
      <div className="mb-4">
        <p className="text-sm font-semibold text-primary-900 mb-2">Composición</p>
        <div className="flex flex-wrap gap-2">
          {fund.composition.slice(0, 3).map((comp, idx) => (
            <span key={idx} className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded border border-primary-200">
              {comp.percentage}%
            </span>
          ))}
          {fund.composition.length > 3 && (
            <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded border border-slate-200">
              +{fund.composition.length - 3} más
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      {showAction && (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={onViewDetails}>
            Detalles
          </Button>
          <Button variant="secondary" size="sm" className="flex-1" onClick={onInvest}>
            Invertir
          </Button>
        </div>
      )}
    </div>
  );
};
