'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Input } from '@/components/common/Input';
import { MetricCard } from '@/components/common/MetricCard';
import { Table } from '@/components/common/Table';
import { ArrowLeft, Download, Edit2, Save, X } from 'lucide-react';
import { projects, portfolios, tokens } from '@/lib/mockData';
import { formatCurrency, formatDate, formatPercentage, getProgressColor } from '@/lib/utils';

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const project = projects.find((p) => p.id === params.id);
  const token = tokens.find((t) => t.projectId === params.id);
  const projectPortfolios = portfolios.filter((p) => p.projectId === params.id);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>(
    project ? { ...project } : {}
  );

  if (!project) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Atrás
          </Button>
        </div>
        <div className="text-center py-12">
          <p className="text-slate-600">Proyecto no encontrado</p>
        </div>
      </div>
    );
  }

  const progress = project.progress;
  const raisedPercentage = (project.raisedAmount / project.totalAmount) * 100;
  const availableTokens = project.tokensAvailable;
  const soldTokens = project.tokensTotal - availableTokens;

  const investmentHistory = projectPortfolios.map((p, idx) => ({
    id: `inv-${idx}`,
    ...p,
  }));

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-primary-900">{project.name}</h1>
            <p className="text-slate-600 mt-1">{project.location.city}, {project.location.country}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {!isEditing && (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              <Edit2 className="w-4 h-4 mr-2" />
              Editar
            </Button>
          )}
          {isEditing && (
            <>
              <Button variant="secondary" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Guardar
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                <X className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Project Image */}
      <div className="h-72 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
        <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Monto Total"
          value={formatCurrency(project.totalAmount, 'USD')}
          valueColor="text-primary-900"
        />
        <MetricCard
          label="Monto Recaudado"
          value={formatCurrency(project.raisedAmount, 'USD')}
          trend={raisedPercentage >= 100 ? 'up' : raisedPercentage >= 50 ? 'neutral' : 'down'}
          trendValue={`${Math.round(raisedPercentage)}%`}
        />
        <MetricCard
          label="Inversores"
          value={project.investorsCount}
          valueColor="text-cyan-700"
        />
        <MetricCard
          label="Confianza"
          value={project.trust}
          unit="%"
          valueColor="text-emerald-700"
        />
      </div>

      {/* Progress and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Details Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Information */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-primary-900 mb-4">Información del Proyecto</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-primary-900 mb-2 block">Nombre</label>
                  <Input
                    disabled={!isEditing}
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-primary-900 mb-2 block">Tipo</label>
                  <Input
                    disabled={!isEditing}
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-primary-900 mb-2 block">Ciudad</label>
                  <Input
                    disabled={!isEditing}
                    value={formData.location?.city}
                    onChange={(e) =>
                      handleInputChange('location', { ...formData.location, city: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-primary-900 mb-2 block">País</label>
                  <Input
                    disabled={!isEditing}
                    value={formData.location?.country}
                    onChange={(e) =>
                      handleInputChange('location', { ...formData.location, country: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-primary-900 mb-2 block">Descripción</label>
                <textarea
                  disabled={!isEditing}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-4 py-2.5 border-2 rounded-lg border-slate-300 disabled:bg-slate-100"
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* Financial Details */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-primary-900 mb-4">Detalles Financieros</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-primary-900 mb-2 block">Monto Total (USD)</label>
                  <Input
                    disabled={!isEditing}
                    type="number"
                    value={formData.totalAmount}
                    onChange={(e) => handleInputChange('totalAmount', parseFloat(e.target.value))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-primary-900 mb-2 block">Monto Recaudado (USD)</label>
                  <Input
                    disabled={!isEditing}
                    type="number"
                    value={formData.raisedAmount}
                    onChange={(e) => handleInputChange('raisedAmount', parseFloat(e.target.value))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-primary-900 mb-2 block">Retorno Mínimo (%)</label>
                  <Input
                    disabled={!isEditing}
                    type="number"
                    value={formData.estimatedReturn?.min}
                    onChange={(e) =>
                      handleInputChange('estimatedReturn', {
                        ...formData.estimatedReturn,
                        min: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-primary-900 mb-2 block">Retorno Máximo (%)</label>
                  <Input
                    disabled={!isEditing}
                    type="number"
                    value={formData.estimatedReturn?.max}
                    onChange={(e) =>
                      handleInputChange('estimatedReturn', {
                        ...formData.estimatedReturn,
                        max: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-primary-900 mb-2 block">Duración (meses)</label>
                  <Input
                    disabled={!isEditing}
                    type="number"
                    value={formData.durationMonths}
                    onChange={(e) => handleInputChange('durationMonths', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-primary-900 mb-2 block">Inversión Mínima (USD)</label>
                  <Input
                    disabled={!isEditing}
                    type="number"
                    value={formData.minInvestment}
                    onChange={(e) => handleInputChange('minInvestment', parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Investment History */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-primary-900 mb-4">Historial de Inversiones</h2>
            <div className="overflow-x-auto">
              <Table
                columns={[
                  {
                    key: 'investorId',
                    label: 'Inversor',
                    render: (value: string) => <span className="font-medium">{value}</span>,
                  },
                  {
                    key: 'investmentAmount',
                    label: 'Monto Invertido',
                    align: 'right',
                    render: (value: number) => formatCurrency(value, 'USD'),
                  },
                  {
                    key: 'tokensHeld',
                    label: 'Tokens',
                    align: 'center',
                    render: (value: number) => <span className="font-medium">{value}</span>,
                  },
                  {
                    key: 'currentValue',
                    label: 'Valor Actual',
                    align: 'right',
                    render: (value: number) => formatCurrency(value, 'USD'),
                  },
                  {
                    key: 'estimatedReturn',
                    label: 'Retorno Estimado',
                    align: 'right',
                    render: (value: number) => (
                      <span className="text-emerald-700 font-medium">{formatPercentage(value)}</span>
                    ),
                  },
                  {
                    key: 'totalPaymentsReceived',
                    label: 'Pagos Recibidos',
                    align: 'center',
                    render: (value: number) => <span className="font-medium">{value}</span>,
                  },
                ]}
                data={investmentHistory}
                rowKey="id"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar Info */}
        <div className="space-y-4">
          {/* Status and Progress */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-primary-900 mb-4">Estado</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-600">Progreso de Recaudación</span>
                  <span className="text-sm font-bold text-primary-900">{raisedPercentage.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full ${getProgressColor(raisedPercentage)}`}
                    style={{ width: `${Math.min(raisedPercentage, 100)}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-600">Ejecución del Proyecto</span>
                  <span className="text-sm font-bold text-primary-900">{progress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full ${getProgressColor(progress)}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <div className="pt-2">
                <Badge status={project.status} />
              </div>
            </div>
          </div>

          {/* Token Info */}
          {token && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-bold text-primary-900 mb-4">Token {token.symbol}</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-600 mb-1">Nombre</p>
                  <p className="font-semibold text-primary-900">{token.name}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 mb-1">Suministro Total</p>
                  <p className="font-semibold text-primary-900">{token.totalSupply.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 mb-1">Suministro en Circulación</p>
                  <p className="font-semibold text-primary-900">{token.circulatingSupply.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 mb-1">Precio USD</p>
                  <p className="font-semibold text-primary-900">{formatCurrency(token.priceUSD, 'USD')}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 mb-1">Holders</p>
                  <p className="font-semibold text-primary-900">{token.holders.toLocaleString()}</p>
                </div>
                <div className="pt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    Ver Token
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Risk and Metrics */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-primary-900 mb-4">Riesgo y Métricas</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-600 mb-1">Nivel de Riesgo</p>
                <Badge status={project.riskLevel} />
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-2">Score de Confianza</p>
                <div className="flex items-end gap-2">
                  <div className="flex-1 bg-slate-200 rounded-full h-2">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-emerald-500 rounded-full"
                      style={{ width: `${project.trust}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-primary-900">{project.trust}%</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-1">Última Actualización</p>
                <p className="text-sm text-primary-900">{formatDate(project.lastUpdate)}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <Button variant="secondary" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Descargar Documentos
            </Button>
            <Button variant="outline" className="w-full">
              Ver Tokens
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
