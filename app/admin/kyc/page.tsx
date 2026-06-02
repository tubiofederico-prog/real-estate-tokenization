'use client';
import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { MetricCard } from '@/components/common/MetricCard';
import { Table } from '@/components/common/Table';
import { FileText, Check, X, Download, Eye } from 'lucide-react';
import { investors } from '@/lib/mockData';

export default function KYCPage() {
  const [selectedInvestor, setSelectedInvestor] = useState<any>(null);
  const pendingKYC = investors.filter((i) => i.kycStatus === 'pending');
  const verifiedKYC = investors.filter((i) => i.kycStatus === 'verified');
  const rejectedKYC = investors.filter((i) => i.kycStatus === 'rejected');

  const columns: any[] = [
    {
      key: 'name',
      label: 'Nombre',
      render: (value: string, row: any) => (
        <div>
          <p className="font-semibold text-primary-900">{value}</p>
          <p className="text-xs text-slate-600">{row.email}</p>
        </div>
      ),
    },
    {
      key: 'country',
      label: 'País',
      render: (value: string) => <span>{value}</span>,
    },
    {
      key: 'joinedAt',
      label: 'Registrado',
      render: (value: string) => new Date(value).toLocaleDateString('es-AR'),
    },
    {
      key: 'totalInvested',
      label: 'Inversión Pendiente',
      align: 'right' as const,
      render: (value: number, row: any) => (
        <span className="font-bold">${row.totalInvested > 0 ? row.totalInvested.toLocaleString() : 'Sin inversión'}</span>
      ),
    },
    {
      key: 'kycStatus',
      label: 'Estado',
      render: (value: string) => <Badge status={value} />,
    },
    {
      key: 'id',
      label: 'Acciones',
      align: 'center' as const,
      render: (value: string, row: any) => (
        <div className="flex items-center gap-2 justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedInvestor(row)}
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  const documents = [
    { name: 'Documento de Identidad', status: 'verified', uploadDate: '2026-05-15' },
    { name: 'Comprobante de Domicilio', status: 'pending', uploadDate: '' },
    { name: 'Declaración de Impuestos', status: 'pending', uploadDate: '' },
    { name: 'Fuente de Fondos', status: 'verified', uploadDate: '2026-05-20' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">Gestión KYC/Compliance</h1>
          <p className="text-slate-600 mt-2">
            {pendingKYC.length} pendientes de verificación
          </p>
        </div>
        <Button variant="secondary">
          <Download className="w-5 h-5 mr-2" />
          Exportar Reportes
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Pendientes de Verificación"
          value={pendingKYC.length}
          valueColor="text-yellow-700"
          trendValue={`${((pendingKYC.length / investors.length) * 100).toFixed(0)}% del total`}
          trend="neutral"
        />
        <MetricCard
          label="Verificados"
          value={verifiedKYC.length}
          valueColor="text-emerald-700"
          trendValue={`${((verifiedKYC.length / investors.length) * 100).toFixed(0)}% completado`}
          trend="up"
        />
        <MetricCard
          label="Rechazados"
          value={rejectedKYC.length}
          valueColor="text-red-700"
        />
        <MetricCard
          label="Tasa de Aprobación"
          value={`${((verifiedKYC.length / investors.length) * 100).toFixed(0)}%`}
          valueColor="text-cyan-700"
        />
      </div>

      {/* Tabs and Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-4">
            <div className="flex gap-2">
              <Button
                variant={selectedInvestor ? 'outline' : 'secondary'}
                size="sm"
              >
                Pendientes ({pendingKYC.length})
              </Button>
              <Button variant="outline" size="sm">
                Verificados ({verifiedKYC.length})
              </Button>
              <Button variant="outline" size="sm">
                Rechazados ({rejectedKYC.length})
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <Table columns={columns} data={pendingKYC} rowKey="id" />
          </div>
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-1">
          {selectedInvestor ? (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4 sticky top-6">
              <div>
                <h3 className="font-bold text-primary-900 text-lg mb-2">{selectedInvestor.name}</h3>
                <p className="text-xs text-slate-600 mb-1">Email</p>
                <p className="text-sm font-medium text-primary-900">{selectedInvestor.email}</p>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <h4 className="font-semibold text-primary-900 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Documentos Requeridos
                </h4>
                <div className="space-y-2">
                  {documents.map((doc) => (
                    <div key={doc.name} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded">
                      <div
                        className={`w-2 h-2 rounded-full ${doc.status === 'verified' ? 'bg-emerald-500' : 'bg-yellow-500'}`}
                      />
                      <div className="flex-1 text-sm">
                        <p className="font-medium text-slate-700">{doc.name}</p>
                        {doc.uploadDate && (
                          <p className="text-xs text-slate-500">{new Date(doc.uploadDate).toLocaleDateString('es-AR')}</p>
                        )}
                      </div>
                      {doc.status === 'verified' && (
                        <Check className="w-4 h-4 text-emerald-600" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4 space-y-2">
                <h4 className="font-semibold text-primary-900 mb-3">Acciones</h4>
                <Button variant="secondary" className="w-full" size="sm">
                  <Check className="w-4 h-4 mr-2" />
                  Aprobar KYC
                </Button>
                <Button variant="danger" className="w-full" size="sm">
                  <X className="w-4 h-4 mr-2" />
                  Rechazar
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  Solicitar Documentos
                </Button>
              </div>

              <button
                onClick={() => setSelectedInvestor(null)}
                className="text-sm text-slate-500 hover:text-slate-700 w-full py-2"
              >
                Cerrar
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center py-12">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-sm">Selecciona un usuario para ver sus documentos</p>
            </div>
          )}
        </div>
      </div>

      {/* Verification Summary */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-xl font-bold text-primary-900 mb-4">Resumen de Verificaciones Recientes</h2>
        <div className="space-y-3">
          {pendingKYC.slice(0, 5).map((investor) => (
            <div key={investor.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div>
                <p className="font-semibold text-primary-900">{investor.name}</p>
                <p className="text-xs text-slate-600">{investor.country}</p>
              </div>
              <Badge status="pending" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
