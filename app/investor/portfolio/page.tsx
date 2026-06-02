'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { MetricCard } from '@/components/common/MetricCard';
import { Badge } from '@/components/common/Badge';
import { Table } from '@/components/common/Table';
import { TrendingUp, Filter, Eye, EyeOff } from 'lucide-react';
import { portfolios, projects } from '@/lib/mockData';
import { formatCurrency, formatDate, formatPercentage } from '@/lib/utils';

export default function PortfolioPage() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards');

  const investorPortfolios = portfolios;

  const filteredPortfolios = investorPortfolios.filter((p) => {
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesStatus;
  });

  const calculateMetrics = () => {
    const totalInvested = filteredPortfolios.reduce((sum, p) => sum + p.investmentAmount, 0);
    const currentValue = filteredPortfolios.reduce((sum, p) => sum + p.currentValue, 0);
    const totalGain = currentValue - totalInvested;
    const gainPercentage = totalInvested > 0 ? (totalGain / totalInvested) * 100 : 0;

    return {
      totalInvested,
      currentValue,
      totalGain,
      gainPercentage,
      count: filteredPortfolios.length,
    };
  };

  const metrics = calculateMetrics();

  const portfolioData = filteredPortfolios.map((portfolio) => {
    const project = projects.find((p) => p.id === portfolio.projectId);
    return {
      id: portfolio.projectId,
      projectName: project?.name || 'Unknown',
      invested: portfolio.investmentAmount,
      currentValue: portfolio.currentValue,
      gain: portfolio.currentValue - portfolio.investmentAmount,
      gainPercentage: ((portfolio.currentValue - portfolio.investmentAmount) / portfolio.investmentAmount) * 100,
      status: portfolio.status,
      riskLevel: project?.riskLevel || 'medium',
      location: project?.location.city || '',
      investmentDate: portfolio.investmentDate,
      nextPayment: portfolio.nextPaymentDate,
      paymentsReceived: portfolio.totalPaymentsReceived,
    };
  });

  const tableColumns = [
    {
      key: 'projectName',
      label: 'Proyecto',
      render: (value: string, row: any) => (
        <button
          onClick={() => router.push(`/investor/portfolio/${row.id}`)}
          className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
        >
          {value}
        </button>
      ),
    },
    {
      key: 'location',
      label: 'Ubicación',
      render: (value: string) => <span className="text-sm text-slate-600">{value}</span>,
    },
    {
      key: 'invested',
      label: 'Invertido',
      align: 'right' as const,
      render: (value: number) => formatCurrency(value, 'USD'),
    },
    {
      key: 'currentValue',
      label: 'Valor Actual',
      align: 'right' as const,
      render: (value: number) => <span className="font-semibold">{formatCurrency(value, 'USD')}</span>,
    },
    {
      key: 'gain',
      label: 'Ganancia',
      align: 'right' as const,
      render: (value: number) => (
        <span className={value >= 0 ? 'text-emerald-600 font-semibold' : 'text-red-600 font-semibold'}>
          {value >= 0 ? '+' : ''}{formatCurrency(value, 'USD')}
        </span>
      ),
    },
    {
      key: 'gainPercentage',
      label: 'Retorno',
      align: 'right' as const,
      render: (value: number) => (
        <span className={value >= 0 ? 'text-emerald-600 font-semibold' : 'text-red-600 font-semibold'}>
          {formatPercentage(value)}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Estado',
      render: (value: string) => <Badge status={value} />,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">Mi Cartera</h1>
          <p className="text-slate-600 mt-2">Visualiza todas tus inversiones y su desempeño</p>
        </div>
        <Button variant="primary" onClick={() => router.push('/investor/projects')}>
          + Invertir en Nuevo Proyecto
        </Button>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          label="Cartera Total"
          value={formatCurrency(metrics.currentValue, 'USD')}
          trend="up"
          trendValue={`+${formatCurrency(metrics.totalGain, 'USD')}`}
          icon={<TrendingUp className="w-6 h-6" />}
        />
        <MetricCard
          label="Invertido"
          value={formatCurrency(metrics.totalInvested, 'USD')}
          trendValue={`${metrics.count} activos`}
        />
        <MetricCard
          label="Ganancias"
          value={formatCurrency(metrics.totalGain, 'USD')}
          trend="up"
          trendValue={`+${formatPercentage(metrics.gainPercentage)}`}
          valueColor="text-emerald-600"
        />
        <MetricCard
          label="Rentabilidad"
          value={`${formatPercentage(metrics.gainPercentage)}`}
          trendValue="en cartera"
          valueColor="text-cyan-600"
        />
      </div>

      {/* Filters and View Controls */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-400" />
            <span className="text-sm font-medium text-slate-600 mr-3">Filtrar por estado:</span>
            <div className="flex gap-2">
              {['all', 'active', 'completed', 'withdrawn'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    statusFilter === status
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {status === 'all'
                    ? 'Todos'
                    : status === 'active'
                      ? 'Activos'
                      : status === 'completed'
                        ? 'Completados'
                        : 'Retirados'}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'cards' ? 'bg-primary-100 text-primary-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'table' ? 'bg-primary-100 text-primary-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <EyeOff className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Cards View */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition-all group cursor-pointer"
              onClick={() => router.push(`/investor/portfolio/${item.id}`)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-primary-900 group-hover:text-primary-600 transition-colors mb-1">
                    {item.projectName}
                  </h3>
                  <p className="text-sm text-slate-600">{item.location}</p>
                </div>
                <Badge status={item.status} />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-slate-50 rounded-lg text-sm">
                <div>
                  <p className="text-slate-600 text-xs font-medium mb-1">Invertido</p>
                  <p className="text-primary-900 font-bold">{formatCurrency(item.invested, 'USD')}</p>
                </div>
                <div>
                  <p className="text-slate-600 text-xs font-medium mb-1">Valor Actual</p>
                  <p className="text-primary-900 font-bold">{formatCurrency(item.currentValue, 'USD')}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-slate-600 text-xs font-medium mb-1">Ganancia</p>
                  <p className={item.gain >= 0 ? 'text-emerald-600 font-bold' : 'text-red-600 font-bold'}>
                    {item.gain >= 0 ? '+' : ''}{formatCurrency(item.gain, 'USD')}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 text-xs font-medium mb-1">Retorno</p>
                  <p className={item.gainPercentage >= 0 ? 'text-emerald-600 font-bold' : 'text-red-600 font-bold'}>
                    {formatPercentage(item.gainPercentage)}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 mb-4 pb-4 border-t border-slate-200 pt-4">
                <div className="flex items-center justify-between">
                  <span>Inversión:</span>
                  <span className="font-medium text-primary-900">{formatDate(item.investmentDate)}</span>
                </div>
                {item.nextPayment && (
                  <div className="flex items-center justify-between">
                    <span>Próximo pago:</span>
                    <span className="font-medium text-primary-900">{formatDate(item.nextPayment)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span>Pagos recibidos:</span>
                  <span className="font-medium text-primary-900">{item.paymentsReceived}</span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/investor/portfolio/${item.id}`);
                }}
              >
                Ver Detalles
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="overflow-x-auto">
            <Table
              columns={tableColumns}
              data={portfolioData}
              rowKey="id"
              onRowClick={(row) => router.push(`/investor/portfolio/${row.id}`)}
            />
          </div>
        </div>
      )}

      {/* No Data Message */}
      {portfolioData.length === 0 && (
        <div className="text-center py-16">
          <TrendingUp className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-700 mb-2">No tienes inversiones aún</h3>
          <p className="text-slate-600 mb-6">Comienza a invertir en nuestros proyectos para construir tu cartera</p>
          <Button variant="primary" onClick={() => router.push('/investor/projects')}>
            Explorar Proyectos
          </Button>
        </div>
      )}

      {/* Portfolio Tips */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-200 p-8">
        <h2 className="text-xl font-bold text-primary-900 mb-4">Consejos para tu Cartera</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold text-primary-900 mb-2">Diversifica</h3>
            <p className="text-sm text-slate-600">
              Invierte en diferentes proyectos y geografías para reducir riesgo y mejorar retornos.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-primary-900 mb-2">Monitorea Regularmente</h3>
            <p className="text-sm text-slate-600">
              Revisa tus posiciones mensualmente y ajusta tu estrategia según tus objetivos.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-primary-900 mb-2">Reinvierte Ganancias</h3>
            <p className="text-sm text-slate-600">
              Usa tus dividendos para invertir en nuevos proyectos y benefíciate del interés compuesto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
