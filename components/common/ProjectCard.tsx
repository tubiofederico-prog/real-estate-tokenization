import { MapPin, TrendingUp } from 'lucide-react';
import { Badge } from './Badge';
import { Button } from './Button';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  onViewDetails?: () => void;
  onInvest?: () => void;
  showAction?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onViewDetails,
  onInvest,
  showAction = true,
}) => {
  const progressPercent = project.progress;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Badge status={project.status} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-primary-900 mb-2 line-clamp-2">{project.name}</h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-slate-600 mb-4">
          <MapPin className="w-4 h-4 text-primary-600" />
          <span>
            {project.location.city}, {project.location.country}
          </span>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div>
            <p className="text-slate-500 text-xs font-medium">Monto Buscado</p>
            <p className="text-primary-900 font-bold">{formatCurrency(project.totalAmount, 'USD')}</p>
          </div>
          <div>
            <p className="text-slate-500 text-xs font-medium">Rentabilidad</p>
            <p className="text-emerald-600 font-bold">
              {formatPercentage(project.estimatedReturn.min)}-{formatPercentage(project.estimatedReturn.max)}
            </p>
          </div>
          <div>
            <p className="text-slate-500 text-xs font-medium">Plazo</p>
            <p className="text-primary-900 font-bold">{project.durationMonths} meses</p>
          </div>
          <div>
            <p className="text-slate-500 text-xs font-medium">Inversores</p>
            <p className="text-primary-900 font-bold">{project.investorsCount}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-slate-600">Financiado</p>
            <p className="text-xs font-bold text-primary-900">{progressPercent}%</p>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        {showAction && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={onViewDetails}
            >
              Ver Detalle
            </Button>
            <Button variant="primary" size="sm" className="flex-1" onClick={onInvest}>
              Invertir
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
