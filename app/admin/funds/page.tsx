'use client';
import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { MetricCard } from '@/components/common/MetricCard';
import { Table } from '@/components/common/Table';
import { Plus, Eye, TrendingUp, Users, Target } from 'lucide-react';
import { funds, projects } from '@/lib/mockData';
import { formatCurrency, formatPercentage } from '@/lib/utils';

export default function FundsPage() {
  const [selectedFund, setSelectedFund] = useState<any>(null);

  const totalCapitalRaised = funds.reduce((sum, f) => sum + f.capitalRaised, 0);
  const totalCapitalTarget = funds.reduce((sum, f) => sum + f.capitalTarget, 0);
  const totalInvestors = funds.reduce((sum, f) => sum + f.investorsCount, 0);
  const averageReturn = funds.reduce((sum, f) => sum + (f.estimatedReturn.min + f.estimatedReturn.max) / 2, 0) / funds.length;

  const columns: any[] = [
    {
      key: 'name',
      label: 'Nombre del Fondo',
      render: (value: string, row: any) => (
        <div>
          <p className="font-semibold text-primary-900">{value}</p>
          <p className="text-xs text-slate-600 line-clamp-1">{row.description}</p>
        </div>
      ),
    },
    {
      key: 'capitalRaised',
      label: 'Capital Recaudado',
      align: 'right' as const,
      render: (value: number) => <span className="font-bold">{formatCurrency(value, 'USD')}</span>,
    },
    {
      key: 'capitalTarget',
      label: 'Meta',
      align: 'right' as const,
      render: (value: number) => <span className="text-slate-600">{formatCurrency(value, 'USD')}</span>,
    },
    {
      key: 'investorsCount',
      label: 'Inversores',
      align: 'center' as const,
      render: (value: number) => <span className="font-bold">{value}</span>,
    },
    {
      key: 'riskLevel',
      label: 'Riesgo',
      render: (value: string) => <Badge status={value} />,
    },
    {
      key: 'status',
      label: 'Estado',
      render: (value: string) => <Badge status={value} />,
    },
    {
      key: 'id',
      label: 'Acciones',
      align: 'center' as const,
      render: (value: string, row: any) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedFund(row)}
        >
          <Eye className="w-4 h-4" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">Gestión de Fondos</h1>
          <p className="text-slate-600 mt-2">{funds.length} fondos activos</p>
        </div>
        <Button variant="primary" size="lg">
          <Plus className="w-5 h-5 mr-2" />
          Crear Fondo
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Capital Total Recaudado"
          value={formatCurrency(totalCapitalRaised, 'USD')}
          valueColor="text-primary-900"
        />
        <MetricCard
          label="Meta Total"
          value={formatCurrency(totalCapitalTarget, 'USD')}
          valueColor="text-slate-700"
          trendValue={`${((totalCapitalRaised / totalCapitalTarget) * 100).toFixed(0)}% cumplido`}
          trend="neutral"
        />
        <MetricCard
          label="Inversores Totales"
          value={totalInvestors.toLocaleString()}
          valueColor="text-cyan-700"
          icon={<Users className="w-6 h-6" />}
        />
        <MetricCard
          label="Retorno Promedio"
          value={formatPercentage(averageReturn)}
          valueColor="text-emerald-700"
          icon={<TrendingUp className="w-6 h-6" />}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <Table columns={columns} data={funds} rowKey="id" />
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {selectedFund ? (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sticky top-6 space-y-4">
              <div>
                <h3 className="font-bold text-primary-900 text-lg mb-2">{selectedFund.name}</h3>
                <p className="text-xs text-slate-600">{selectedFund.description}</p>
              </div>

              <div className="border-t border-slate-200 pt-4 space-y-3">
                <div>
                  <p className="text-xs text-slate-600 mb-1">Progreso de Recaudación</p>
                  <div className="flex items-end gap-2">
                    <div className="flex-1 bg-slate-200 rounded-full h-2">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
                        style={{
                          width: `${Math.min((selectedFund.capitalRaised / selectedFund.capitalTarget) * 100, 100)}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-bold text-primary-900">
                      {((selectedFund.capitalRaised / selectedFund.capitalTarget) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Recaudado</p>
                    <p className="font-bold text-primary-900">{formatCurrency(selectedFund.capitalRaised, 'USD')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Meta</p>
                    <p className="font-bold text-primary-900">{formatCurrency(selectedFund.capitalTarget, 'USD')}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Retorno Min</p>
                    <p className="font-bold text-emerald-700">{selectedFund.estimatedReturn.min}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Retorno Max</p>
                    <p className="font-bold text-emerald-700">{selectedFund.estimatedReturn.max}%</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-slate-600 mb-1">Duración</p>
                  <p className="font-bold text-primary-900">{selectedFund.durationMonths} meses</p>
                </div>

                <div>
                  <p className="text-xs text-slate-600 mb-1">Inversores</p>
                  <p className="font-bold text-primary-900">{selectedFund.investorsCount}</p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <h4 className="font-semibold text-primary-900 mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Composición
                </h4>
                <div className="space-y-2 text-sm">
                  {selectedFund.composition.map((comp: any, idx: number) => {
                    const proj = projects.find((p) => p.id === comp.projectId);
                    return (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-slate-600 truncate">{proj?.name}</span>
                        <span className="font-bold text-primary-900">{comp.percentage}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4 space-y-2">
                <Button variant="secondary" className="w-full" size="sm">
                  Ver Detalles
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  Editar
                </Button>
                <button
                  onClick={() => setSelectedFund(null)}
                  className="text-sm text-slate-500 hover:text-slate-700 w-full py-2"
                >
                  Cerrar
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center py-12">
              <Target className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-sm">Selecciona un fondo para ver sus detalles</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
