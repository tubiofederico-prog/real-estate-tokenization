'use client';
import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { MetricCard } from '@/components/common/MetricCard';
import { Badge } from '@/components/common/Badge';
import { Copy, Eye, CheckCircle, AlertCircle, Code } from 'lucide-react';
import { smartContracts, projects } from '@/lib/mockData';
import { formatCurrency, formatDate, formatPercentage } from '@/lib/utils';

export default function SmartContractsPage() {
  const [selectedContract, setSelectedContract] = useState<any>(null);

  const totalDistribution = smartContracts.reduce((sum, sc) => sum + sc.rentDistributionPercentage, 0) / smartContracts.length;
  const totalExecuted = smartContracts.reduce(
    (sum, sc) => sum + sc.executionHistory.reduce((s, eh) => s + eh.amount, 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">Gestión de Smart Contracts</h1>
          <p className="text-slate-600 mt-2">{smartContracts.length} contratos activos</p>
        </div>
        <Button variant="primary" size="lg">
          <Code className="w-5 h-5 mr-2" />
          Crear Contrato
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Contratos Activos"
          value={smartContracts.filter((sc) => sc.status === 'active').length}
          valueColor="text-emerald-700"
        />
        <MetricCard
          label="Distribución Promedio"
          value={formatPercentage(totalDistribution)}
          valueColor="text-primary-900"
        />
        <MetricCard
          label="Total Distribuido"
          value={formatCurrency(totalExecuted, 'USD')}
          valueColor="text-cyan-700"
        />
        <MetricCard
          label="Ejecuciones Pendientes"
          value={smartContracts.reduce((sum, sc) => sum + (sc.paymentSchedule.length - sc.executionHistory.length), 0)}
          valueColor="text-yellow-700"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contracts List */}
        <div className="lg:col-span-2 space-y-4">
          {smartContracts.map((contract) => {
            const project = projects.find((p) => p.id === contract.projectId);
            const executedCount = contract.executionHistory.length;
            const totalPayments = contract.paymentSchedule.length;
            const totalDistributed = contract.executionHistory.reduce((sum, eh) => sum + eh.amount, 0);

            return (
              <div
                key={contract.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-all cursor-pointer"
                onClick={() => setSelectedContract(contract)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-primary-900 flex items-center gap-2">
                      {project?.name}
                      {contract.status === 'active' && (
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      )}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 font-mono">{contract.address}</p>
                  </div>
                  <Badge status={contract.status} />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Distribución</p>
                    <p className="font-bold text-primary-900">{contract.rentDistributionPercentage}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Pagos</p>
                    <p className="font-bold text-primary-900">
                      {executedCount}/{totalPayments}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Distribuido</p>
                    <p className="font-bold text-emerald-700">{formatCurrency(totalDistributed, 'USD')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Próximo Pago</p>
                    <p className="font-bold text-cyan-700">
                      {contract.paymentSchedule[executedCount]
                        ? formatDate(contract.paymentSchedule[executedCount].date)
                        : 'Completado'}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-slate-600">Ejecución de Pagos</span>
                    <span className="text-xs font-bold text-primary-900">
                      {((executedCount / totalPayments) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                      style={{ width: `${(executedCount / totalPayments) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detail Panel */}
        <div>
          {selectedContract ? (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sticky top-6 space-y-4">
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-primary-900 text-lg">
                  {projects.find((p) => p.id === selectedContract.projectId)?.name}
                </h3>
                <Badge status={selectedContract.status} />
              </div>

              {/* Contract Info */}
              <div className="border-t border-slate-200 pt-4 space-y-3">
                <div>
                  <p className="text-xs text-slate-600 mb-1">Dirección del Contrato</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-xs bg-slate-100 p-2 rounded font-mono text-slate-700">
                      {selectedContract.address}
                    </code>
                    <Button variant="ghost" size="sm">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-slate-600 mb-1">Porcentaje de Distribución</p>
                  <p className="font-bold text-primary-900">{selectedContract.rentDistributionPercentage}%</p>
                </div>

                <div>
                  <p className="text-xs text-slate-600 mb-1">Estado del Contrato</p>
                  <p className="font-bold text-emerald-700 capitalize">{selectedContract.status}</p>
                </div>
              </div>

              {/* Payment Schedule */}
              <div className="border-t border-slate-200 pt-4">
                <h4 className="font-semibold text-primary-900 mb-3 text-sm">Cronograma de Pagos</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {selectedContract.paymentSchedule.map((payment: any, idx: number) => {
                    const executed = selectedContract.executionHistory[idx];
                    return (
                      <div
                        key={idx}
                        className={`text-xs p-2 rounded border ${
                          executed
                            ? 'bg-emerald-50 border-emerald-200'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-slate-700">{formatDate(payment.date)}</span>
                          <span className="font-bold text-primary-900">{payment.percentage}%</span>
                        </div>
                        {executed && (
                          <div className="flex items-center gap-1 mt-1 text-emerald-700">
                            <CheckCircle className="w-3 h-3" />
                            <span className="text-xs">{formatCurrency(executed.amount, 'USD')}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Execution History */}
              <div className="border-t border-slate-200 pt-4">
                <h4 className="font-semibold text-primary-900 mb-3 text-sm">Historial de Ejecuciones</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {selectedContract.executionHistory.map((execution: any, idx: number) => (
                    <div key={idx} className="text-xs p-2 bg-emerald-50 border border-emerald-200 rounded">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700">{formatDate(execution.date)}</span>
                        <span className="font-bold text-emerald-700">{formatCurrency(execution.amount, 'USD')}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-emerald-600">
                        <CheckCircle className="w-3 h-3" />
                        <span className="capitalize">{execution.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-slate-200 pt-4 space-y-2">
                <Button variant="secondary" className="w-full" size="sm">
                  Ejecutar Pago
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  Ver en Blockchain
                </Button>
                <button
                  onClick={() => setSelectedContract(null)}
                  className="text-sm text-slate-500 hover:text-slate-700 w-full py-2"
                >
                  Cerrar
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center py-12">
              <Code className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-sm">Selecciona un contrato para ver los detalles</p>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-xl font-bold text-primary-900 mb-4">Resumen de Distribuciones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {smartContracts.map((contract) => {
            const executed = contract.executionHistory.length;
            const total = contract.paymentSchedule.length;
            const distributed = contract.executionHistory.reduce((sum, eh) => sum + eh.amount, 0);

            return (
              <div key={contract.id} className="p-4 border border-slate-200 rounded-lg">
                <p className="text-sm font-medium text-slate-600 mb-3">
                  {projects.find((p) => p.id === contract.projectId)?.name}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Pagos Ejecutados</span>
                    <span className="font-bold text-primary-900">{executed}/{total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Total Distribuido</span>
                    <span className="font-bold text-emerald-700">{formatCurrency(distributed, 'USD')}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500"
                      style={{ width: `${(executed / total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
