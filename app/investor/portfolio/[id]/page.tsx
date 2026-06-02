'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { MetricCard } from '@/components/common/MetricCard';
import { Badge } from '@/components/common/Badge';
import { Table } from '@/components/common/Table';
import { ReturnsChart } from '@/components/charts/ReturnsChart';
import { ArrowLeft, TrendingUp, FileText, Download, Calendar, Wallet, DollarSign, Target } from 'lucide-react';
import { portfolios, projects, transactions, smartContracts } from '@/lib/mockData';
import { formatCurrency, formatPercentage, formatDate, formatDateLong, formatNumber } from '@/lib/utils';

export default function PortfolioDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const portfolio = portfolios.find((p) => p.projectId === projectId);
  const project = projects.find((p) => p.id === projectId);
  const relatedTransactions = transactions.filter((t) => t.projectId === projectId);
  const smartContract = smartContracts.find((sc) => sc.projectId === projectId);

  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'documents'>('overview');

  if (!portfolio || !project) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600 mb-4">Inversión no encontrada</p>
        <Button variant="primary" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver
        </Button>
      </div>
    );
  }

  const gain = portfolio.currentValue - portfolio.investmentAmount;
  const gainPercentage = (gain / portfolio.investmentAmount) * 100;
  const monthsSinceInvestment = Math.floor(
    (new Date().getTime() - new Date(portfolio.investmentDate).getTime()) / (1000 * 60 * 60 * 24 * 30)
  );
  const monthsRemaining = project.durationMonths - monthsSinceInvestment;

  const transactionTableData = relatedTransactions.map((txn) => ({
    id: txn.id,
    date: txn.date,
    type: txn.type,
    amount: txn.amount,
    status: txn.status,
    description: txn.description,
  }));

  const transactionColumns = [
    {
      key: 'date',
      label: 'Fecha',
      render: (value: string) => formatDate(value),
    },
    {
      key: 'type',
      label: 'Tipo',
      render: (value: string) => {
        const typeLabels: Record<string, string> = {
          investment: 'Inversión',
          dividend: 'Dividendo',
          withdrawal: 'Retiro',
          deposit: 'Depósito',
        };
        return <span className="font-medium text-primary-900">{typeLabels[value] || value}</span>;
      },
    },
    {
      key: 'description',
      label: 'Descripción',
      render: (value: string) => <span className="text-sm text-slate-600">{value}</span>,
    },
    {
      key: 'amount',
      label: 'Monto',
      align: 'right' as const,
      render: (value: number, row: any) => (
        <span className={value > 0 ? 'text-emerald-600 font-semibold' : 'text-primary-900 font-semibold'}>
          {value > 0 ? '+' : ''}{formatCurrency(value, 'USD')}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Estado',
      align: 'center' as const,
      render: (value: string) => <Badge status={value} />,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-primary-900">{project.name}</h1>
          <p className="text-slate-600 mt-1">
            {project.location.city}, {project.location.country} • Invertido el {formatDateLong(portfolio.investmentDate)}
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          label="Monto Invertido"
          value={formatCurrency(portfolio.investmentAmount, 'USD')}
          icon={<Wallet className="w-6 h-6" />}
        />
        <MetricCard
          label="Valor Actual"
          value={formatCurrency(portfolio.currentValue, 'USD')}
          trend="up"
          trendValue={formatPercentage(gainPercentage)}
          icon={<DollarSign className="w-6 h-6" />}
        />
        <MetricCard
          label="Ganancias"
          value={formatCurrency(gain, 'USD')}
          trend={gain >= 0 ? 'up' : 'down'}
          trendValue={gain >= 0 ? `+${formatPercentage(gainPercentage)}` : formatPercentage(gainPercentage)}
          icon={<TrendingUp className="w-6 h-6" />}
        />
        <MetricCard
          label="ROI Estimado"
          value={formatPercentage(portfolio.estimatedReturn)}
          trend="up"
          trendValue={`En ${project.durationMonths} meses`}
          icon={<Target className="w-6 h-6" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts and Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Investment Performance Chart */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-primary-900 mb-6">Desempeño de la Inversión</h2>
            <ReturnsChart />
          </div>

          {/* Investment Details */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-primary-900 mb-6">Detalles de la Inversión</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-slate-600 mb-2">Tokens Tenidos</p>
                <p className="text-3xl font-bold text-cyan-700">{formatNumber(portfolio.tokensHeld)}</p>
                <p className="text-xs text-slate-500 mt-2">Tokens de este proyecto</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-2">Precio por Token</p>
                <p className="text-3xl font-bold text-primary-900">${project.pricePerToken}</p>
                <p className="text-xs text-slate-500 mt-2">Precio de inversión inicial</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-2">Estado de la Inversión</p>
                <Badge status={portfolio.status} />
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-2">Riesgo del Proyecto</p>
                <Badge status={project.riskLevel} />
              </div>
            </div>
          </div>

          {/* Timeline / Schedule */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-primary-900 mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Cronograma de Pagos
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                  ✓
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-primary-900">Próximo Pago</p>
                  <p className="text-sm text-slate-600">{formatDateLong(portfolio.nextPaymentDate || new Date().toISOString())}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-600">Estimado</p>
                  <p className="text-lg font-bold text-emerald-700">{formatCurrency(portfolio.currentValue * 0.05, 'USD')}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-primary-900 text-sm">Historial de Pagos</h3>
                {[1, 2, 3, 4].map((payment, index) => (
                  <div key={payment} className="flex items-center gap-3 p-3 border border-slate-100 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${index < portfolio.totalPaymentsReceived ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                    <span className="flex-1 text-sm text-slate-600">Pago {payment} de {Math.ceil(project.durationMonths / 3)}</span>
                    {index < portfolio.totalPaymentsReceived && (
                      <span className="text-xs font-medium text-emerald-600">Completado</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-primary-900">Historial de Transacciones</h2>
            </div>
            {transactionTableData.length > 0 ? (
              <Table columns={transactionColumns} data={transactionTableData} />
            ) : (
              <div className="p-6 text-center text-slate-600">
                <p>No hay transacciones registradas</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Project Info */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-primary-900 mb-4">Información del Proyecto</h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-xs text-slate-600 mb-1">Tipo</p>
                <p className="font-semibold text-primary-900 capitalize">{project.type}</p>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-1">Ubicación</p>
                <p className="font-semibold text-primary-900">{project.location.city}, {project.location.country}</p>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-1">Estado</p>
                <Badge status={project.status} />
              </div>
              <div className="pt-3 border-t border-slate-200">
                <p className="text-xs text-slate-600 mb-1">Duración Total</p>
                <p className="font-semibold text-primary-900">{project.durationMonths} meses</p>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-1">Meses Transcurridos</p>
                <p className="font-semibold text-primary-900">{monthsSinceInvestment}</p>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-1">Meses Restantes</p>
                <p className="font-semibold text-cyan-700">{monthsRemaining}</p>
              </div>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-primary-900 mb-4">Resumen de Desempeño</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-600 mb-2">Retorno Estimado</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-emerald-700">{formatPercentage(portfolio.estimatedReturn)}</p>
                  <p className="text-xs text-slate-600">de retorno</p>
                </div>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-600 mb-1">Ganancia Acumulada</p>
                <p className={`text-lg font-bold ${gain >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                  {gain >= 0 ? '+' : ''}{formatCurrency(gain, 'USD')}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {gainPercentage >= 0 ? '+' : ''}{formatPercentage(gainPercentage)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-1">Pagos Recibidos</p>
                <p className="font-bold text-primary-900">{portfolio.totalPaymentsReceived} de {Math.ceil(project.durationMonths / 3)}</p>
              </div>
            </div>
          </div>

          {/* Smart Contract Info */}
          {smartContract && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-bold text-primary-900 mb-4">Contrato Inteligente</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-xs text-slate-600 mb-1">Dirección</p>
                  <code className="block bg-slate-100 rounded px-2 py-1 text-xs font-mono text-slate-700 truncate">
                    {smartContract.address}
                  </code>
                </div>
                <div>
                  <p className="text-xs text-slate-600 mb-1">Distribución de Rentas</p>
                  <p className="font-semibold text-primary-900">{smartContract.rentDistributionPercentage}%</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 mb-1">Estado</p>
                  <Badge status={smartContract.status} />
                </div>
              </div>
            </div>
          )}

          {/* Documents */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-primary-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Documentos
            </h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-left">
                <FileText className="w-4 h-4 text-primary-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-sm text-primary-900">Contrato</p>
                  <p className="text-xs text-slate-600">PDF</p>
                </div>
                <Download className="w-4 h-4 text-slate-400" />
              </button>
              <button className="w-full flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-left">
                <FileText className="w-4 h-4 text-primary-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-sm text-primary-900">Estado Financiero</p>
                  <p className="text-xs text-slate-600">PDF</p>
                </div>
                <Download className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <Button variant="secondary" className="w-full">
              Aumentar Inversión
            </Button>
            <Button variant="outline" className="w-full">
              Ver en Blockchain
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
