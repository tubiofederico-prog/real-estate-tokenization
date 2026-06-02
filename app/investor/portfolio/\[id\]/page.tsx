'use client';
import { useParams } from 'next/navigation';
import { MetricCard } from '@/components/common/MetricCard';
import { portfolios, projects } from '@/lib/mockData';
import { formatCurrency, formatPercentage } from '@/lib/utils';

export default function PortfolioDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  const portfolio = portfolios.find((p) => p.projectId === projectId);
  const project = projects.find((p) => p.id === projectId);

  if (!portfolio || !project) return <div className="text-center py-12">Inversión no encontrada</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary-900">{project.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MetricCard label="Invertido" value={formatCurrency(portfolio.investmentAmount, 'USD')} />
        <MetricCard label="Valor Actual" value={formatCurrency(portfolio.currentValue, 'USD')} trend="up" trendValue={`+${formatPercentage((portfolio.currentValue - portfolio.investmentAmount) / portfolio.investmentAmount * 100)}`} />
      </div>
    </div>
  );
}
