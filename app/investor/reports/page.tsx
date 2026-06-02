'use client';
import { Button } from '@/components/common/Button';
import { MetricCard } from '@/components/common/MetricCard';
import { Badge } from '@/components/common/Badge';
import { Table } from '@/components/common/Table';
import { PortfolioChart } from '@/components/charts/PortfolioChart';
import { ReturnsChart } from '@/components/charts/ReturnsChart';
import { DistributionChart } from '@/components/charts/DistributionChart';
import { Download, TrendingUp, Target, DollarSign, Calendar } from 'lucide-react';
import { portfolios, projects, getMonthlyReturnsData } from '@/lib/mockData';
import { formatCurrency, formatPercentage, formatDate } from '@/lib/utils';

export default function ReportsPage() {
  const investorPortfolios = portfolios;
  const monthlyData = getMonthlyReturnsData();

  // Calculate key metrics
  const totalInvested = investorPortfolios.reduce((sum, p) => sum + p.investmentAmount, 0);
  const currentValue = investorPortfolios.reduce((sum, p) => sum + p.currentValue, 0);
  const totalReturns = currentValue - totalInvested;
  const totalReturnPercentage = (totalReturns / totalInvested) * 100;
  const averageReturn = investorPortfolios.reduce((sum, p) => sum + p.estimatedReturn, 0) / investorPortfolios.length;

  // Performance by project
  const performanceByProject = investorPortfolios.map((portfolio) => {
    const project = projects.find((p) => p.id === portfolio.projectId);
    const gain = portfolio.currentValue - portfolio.investmentAmount;
    const gainPercentage = (gain / portfolio.investmentAmount) * 100;

    return {
      projectId: portfolio.projectId,
      projectName: project?.name || 'Unknown',
      invested: portfolio.investmentAmount,
      currentValue: portfolio.currentValue,
      gain,
      gainPercentage,
      status: portfolio.status,
      riskLevel: project?.riskLevel || 'medium',
    };
  });

  const tableColumns = [
    {
      key: 'projectName',
      label: 'Proyecto',
      render: (value: string) => <span className="font-semibold text-primary-900">{value}</span>,
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
      render: (value: number) => <span className="text-emerald-600 font-semibold">{formatCurrency(value, 'USD')}</span>,
    },
    {
      key: 'gainPercentage',
      label: 'Retorno %',
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
          <h1 className="text-3xl font-bold text-primary-900">Reportes de Inversión</h1>
          <p className="text-slate-600 mt-2">Análisis completo de tu cartera y rentabilidad</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <Download className="w-5 h-5" />
          Descargar Reporte PDF
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          label="Retorno Total"
          value={formatCurrency(totalReturns, 'USD')}
          trend="up"
          trendValue={`+${formatPercentage(totalReturnPercentage)}`}
          icon={<TrendingUp className="w-6 h-6" />}
          valueColor="text-emerald-600"
        />
        <MetricCard
          label="Monto Invertido"
          value={formatCurrency(totalInvested, 'USD')}
          trendValue={`${investorPortfolios.length} proyectos`}
          icon={<DollarSign className="w-6 h-6" />}
        />
        <MetricCard
          label="Retorno Promedio"
          value={`${formatPercentage(averageReturn)}`}
          trendValue="en cartera"
          icon={<Target className="w-6 h-6" />}
          valueColor="text-cyan-600"
        />
        <MetricCard
          label="Últimos 30 días"
          value={formatCurrency(monthlyData[monthlyData.length - 1].amount, 'USD')}
          trend="up"
          trendValue="Este mes"
          icon={<Calendar className="w-6 h-6" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PortfolioChart />
        </div>
        <DistributionChart />
      </div>

      {/* Returns Chart */}
      <ReturnsChart />

      {/* Performance by Project */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-xl font-bold text-primary-900 mb-6">Rendimiento por Proyecto</h2>
        <div className="overflow-x-auto">
          <Table
            columns={tableColumns}
            data={performanceByProject}
            rowKey="projectId"
          />
        </div>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Performance */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-primary-900 mb-4">Rendimiento Mensual (últimos 6 meses)</h3>
          <div className="space-y-3">
            {monthlyData.map((data, idx) => {
              const isHighest = data.amount === Math.max(...monthlyData.map((d) => d.amount));
              return (
                <div key={idx} className="flex items-center gap-4">
                  <span className="w-12 text-sm font-medium text-slate-600">{data.month}</span>
                  <div className="flex-1 h-8 bg-slate-100 rounded-lg relative overflow-hidden">
                    <div
                      className={`h-full rounded-lg transition-all ${
                        isHighest ? 'bg-emerald-500' : 'bg-cyan-400'
                      }`}
                      style={{
                        width: `${(data.amount / Math.max(...monthlyData.map((d) => d.amount))) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-primary-900 w-32 text-right">
                    {formatCurrency(data.amount, 'USD')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Portfolio Allocation */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-primary-900 mb-4">Asignación de Cartera</h3>
          <div className="space-y-3">
            {performanceByProject
              .sort((a, b) => b.currentValue - a.currentValue)
              .slice(0, 6)
              .map((item, idx) => {
                const allocation = (item.currentValue / currentValue) * 100;
                return (
                  <div key={idx} className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: [
                          '#10b981',
                          '#06b6d4',
                          '#0ea5e9',
                          '#f59e0b',
                          '#ef4444',
                          '#8b5cf6',
                        ][idx],
                      }}
                    />
                    <span className="text-sm text-slate-700 flex-1 truncate">{item.projectName}</span>
                    <span className="text-sm font-semibold text-primary-900">{formatPercentage(allocation)}</span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Additional Reports */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition-shadow text-left group">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-primary-900">Impuesto a las Ganancias</h3>
            <Download className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
          </div>
          <p className="text-sm text-slate-600 mb-4">Reporte de ingresos anuales para declaraciones fiscales</p>
          <Badge status="open" />
        </button>

        <button className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition-shadow text-left group">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-primary-900">Historial de Dividendos</h3>
            <Download className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
          </div>
          <p className="text-sm text-slate-600 mb-4">Detalle completo de todos los pagos de dividendos</p>
          <Badge status="completed" />
        </button>

        <button className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition-shadow text-left group">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-primary-900">Comparativa Anual</h3>
            <Download className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
          </div>
          <p className="text-sm text-slate-600 mb-4">Análisis año a año del desempeño de tu cartera</p>
          <Badge status="open" />
        </button>
      </div>
    </div>
  );
}
