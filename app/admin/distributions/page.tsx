'use client';
import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { MetricCard } from '@/components/common/MetricCard';
import { Table } from '@/components/common/Table';
import { Send, Check, AlertCircle, Calendar, DollarSign } from 'lucide-react';
import { projects, smartContracts, portfolios } from '@/lib/mockData';
import { formatCurrency, formatDate, formatPercentage } from '@/lib/utils';

export default function DistributionsPage() {
  const [selectedDistribution, setSelectedDistribution] = useState<any>(null);
  const [isScheduling, setIsScheduling] = useState(false);

  // Create distribution schedule from smart contracts
  const distributions = smartContracts.flatMap((sc) =>
    sc.paymentSchedule.map((payment, idx) => {
      const executed = sc.executionHistory[idx];
      return {
        id: `${sc.id}-${idx}`,
        projectId: sc.projectId,
        contractId: sc.id,
        date: payment.date,
        percentage: payment.percentage,
        amount: (projects.find((p) => p.id === sc.projectId)?.raisedAmount || 0) * (payment.percentage / 100),
        status: executed ? 'completed' : new Date(payment.date) < new Date() ? 'pending' : 'scheduled',
        executionDate: executed?.date,
        executionAmount: executed?.amount,
      };
    })
  );

  const pendingDistributions = distributions.filter((d) => d.status === 'pending');
  const scheduledDistributions = distributions.filter((d) => d.status === 'scheduled');
  const completedDistributions = distributions.filter((d) => d.status === 'completed');

  const totalPending = pendingDistributions.reduce((sum, d) => sum + d.amount, 0);
  const totalScheduled = scheduledDistributions.reduce((sum, d) => sum + d.amount, 0);
  const totalCompleted = completedDistributions.reduce((sum, d) => sum + d.executionAmount || 0, 0);

  const columns: any[] = [
    {
      key: 'projectId',
      label: 'Proyecto',
      render: (value: string) => {
        const proj = projects.find((p) => p.id === value);
        return (
          <div>
            <p className="font-semibold text-primary-900">{proj?.name}</p>
            <p className="text-xs text-slate-600">{proj?.location.city}</p>
          </div>
        );
      },
    },
    {
      key: 'date',
      label: 'Fecha Programada',
      render: (value: string) => formatDate(value),
    },
    {
      key: 'percentage',
      label: 'Porcentaje',
      align: 'center' as const,
      render: (value: number) => <span className="font-bold">{value}%</span>,
    },
    {
      key: 'amount',
      label: 'Monto',
      align: 'right' as const,
      render: (value: number) => <span className="font-bold">{formatCurrency(value, 'USD')}</span>,
    },
    {
      key: 'status',
      label: 'Estado',
      render: (value: string) => <Badge status={value} />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">Gestión de Distribuciones</h1>
          <p className="text-slate-600 mt-2">
            {pendingDistributions.length} pagos pendientes de rentabilidad
          </p>
        </div>
        <Button variant="primary" size="lg" onClick={() => setIsScheduling(true)}>
          <Send className="w-5 h-5 mr-2" />
          Ejecutar Distribuciones
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Pendientes de Pago"
          value={formatCurrency(totalPending, 'USD')}
          valueColor="text-yellow-700"
          icon={<AlertCircle className="w-6 h-6 text-yellow-600" />}
          trendValue={`${pendingDistributions.length} pagos`}
          trend="neutral"
        />
        <MetricCard
          label="Programados"
          value={formatCurrency(totalScheduled, 'USD')}
          valueColor="text-cyan-700"
          icon={<Calendar className="w-6 h-6 text-cyan-600" />}
          trendValue={`${scheduledDistributions.length} pagos futuros`}
          trend="neutral"
        />
        <MetricCard
          label="Total Completado"
          value={formatCurrency(totalCompleted, 'USD')}
          valueColor="text-emerald-700"
          icon={<Check className="w-6 h-6 text-emerald-600" />}
          trendValue={`${completedDistributions.length} pagos ejecutados`}
          trend="up"
        />
        <MetricCard
          label="Valor Total a Distribuir"
          value={formatCurrency(distributions.reduce((sum, d) => sum + d.amount, 0), 'USD')}
          valueColor="text-primary-900"
          icon={<DollarSign className="w-6 h-6 text-primary-600" />}
        />
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-4">
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            Pendientes ({pendingDistributions.length})
          </Button>
          <Button variant="outline" size="sm">
            Programados ({scheduledDistributions.length})
          </Button>
          <Button variant="outline" size="sm">
            Completados ({completedDistributions.length})
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200">
              <h3 className="font-bold text-primary-900">Distribuciones Pendientes</h3>
            </div>
            <Table
              columns={columns}
              data={pendingDistributions}
              rowKey="id"
              onRowClick={(row) => setSelectedDistribution(row)}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {selectedDistribution ? (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sticky top-6 space-y-4">
              <div>
                <h3 className="font-bold text-primary-900 text-lg mb-2">
                  {projects.find((p) => p.id === selectedDistribution.projectId)?.name}
                </h3>
                <Badge status={selectedDistribution.status} />
              </div>

              <div className="border-t border-slate-200 pt-4 space-y-3">
                <div>
                  <p className="text-xs text-slate-600 mb-1">Fecha Programada</p>
                  <p className="font-bold text-primary-900">{formatDate(selectedDistribution.date)}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-600 mb-1">Porcentaje de Distribución</p>
                  <p className="font-bold text-primary-900">{selectedDistribution.percentage}%</p>
                </div>

                <div>
                  <p className="text-xs text-slate-600 mb-1">Monto Total</p>
                  <p className="font-bold text-emerald-700 text-lg">
                    {formatCurrency(selectedDistribution.amount, 'USD')}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <p className="text-xs text-slate-600 mb-2">Destinatarios</p>
                  <div className="space-y-2">
                    {portfolios
                      .filter((p) => p.projectId === selectedDistribution.projectId)
                      .slice(0, 3)
                      .map((p, idx) => (
                        <div key={idx} className="text-xs p-2 bg-slate-50 rounded border border-slate-200">
                          <p className="font-medium text-slate-700">{p.investorId}</p>
                          <p className="text-slate-600">
                            {formatCurrency((selectedDistribution.amount * p.tokensHeld) / 10000, 'USD')}
                          </p>
                        </div>
                      ))}
                    {portfolios.filter((p) => p.projectId === selectedDistribution.projectId).length > 3 && (
                      <p className="text-xs text-slate-500 px-2">
                        +{portfolios.filter((p) => p.projectId === selectedDistribution.projectId).length - 3} más
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4 space-y-2">
                <Button variant="secondary" className="w-full" size="sm">
                  <Send className="w-4 h-4 mr-2" />
                  Ejecutar Ahora
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  Reprogramar
                </Button>
                <button
                  onClick={() => setSelectedDistribution(null)}
                  className="text-sm text-slate-500 hover:text-slate-700 w-full py-2"
                >
                  Cerrar
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center py-12">
              <DollarSign className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-sm">Selecciona una distribución para ejecutar</p>
            </div>
          )}
        </div>
      </div>

      {/* Distribution Summary */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-xl font-bold text-primary-900 mb-4">Resumen de Distribuciones Completadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {completedDistributions.slice(0, 6).map((dist) => (
            <div key={dist.id} className="p-4 border border-slate-200 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-primary-900 text-sm">
                  {projects.find((p) => p.id === dist.projectId)?.name}
                </h4>
                <Check className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Fecha Ejecución</span>
                  <span className="font-bold">{formatDate(dist.executionDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Monto Distribuido</span>
                  <span className="font-bold text-emerald-700">{formatCurrency(dist.executionAmount || 0, 'USD')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scheduling Modal (simplified) */}
      {isScheduling && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center rounded-xl z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 space-y-4">
            <h3 className="text-xl font-bold text-primary-900">Ejecutar Distribuciones</h3>
            <p className="text-slate-600 text-sm">
              Se ejecutarán {pendingDistributions.length} pagos pendientes por un total de{' '}
              <span className="font-bold">{formatCurrency(totalPending, 'USD')}</span>
            </p>
            <div className="space-y-2">
              <Button variant="secondary" className="w-full">
                Confirmar Ejecución
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setIsScheduling(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
