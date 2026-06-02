'use client';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { MetricCard } from '@/components/common/MetricCard';
import { Table } from '@/components/common/Table';
import {
  ArrowLeft,
  MapPin,
  Users,
  TrendingUp,
  Calendar,
  DollarSign,
  Target,
  Shield,
  Download,
  Plus,
} from 'lucide-react';
import { projects, tokens, portfolios } from '@/lib/mockData';
import { formatCurrency, formatDate, formatPercentage, getProgressColor } from '@/lib/utils';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const project = projects.find((p) => p.id === projectId);
  const token = tokens.find((t) => t.projectId === projectId);
  const projectPortfolios = portfolios.filter((p) => p.projectId === projectId);

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

  const raisedPercentage = (project.raisedAmount / project.totalAmount) * 100;
  const investmentHistory = projectPortfolios.map((p, idx) => ({
    id: `inv-${idx}`,
    investorId: `Inversor ${idx + 1}`,
    investmentAmount: p.investmentAmount,
    tokensHeld: p.tokensHeld,
    currentValue: p.currentValue,
    estimatedReturn: p.estimatedReturn,
    totalPaymentsReceived: p.totalPaymentsReceived,
  }));

  const investmentHistoryColumns = [
    {
      key: 'investorId',
      label: 'Inversor',
      render: (value: string) => <span className="font-medium text-primary-900">{value}</span>,
    },
    {
      key: 'investmentAmount',
      label: 'Monto Invertido',
      align: 'right' as const,
      render: (value: number) => formatCurrency(value, 'USD'),
    },
    {
      key: 'tokensHeld',
      label: 'Tokens',
      align: 'center' as const,
      render: (value: number) => <span className="font-medium">{value}</span>,
    },
    {
      key: 'currentValue',
      label: 'Valor Actual',
      align: 'right' as const,
      render: (value: number) => formatCurrency(value, 'USD'),
    },
    {
      key: 'estimatedReturn',
      label: 'Retorno Est.',
      align: 'right' as const,
      render: (value: number) => (
        <span className="text-emerald-700 font-medium">{formatPercentage(value)}</span>
      ),
    },
    {
      key: 'totalPaymentsReceived',
      label: 'Pagos',
      align: 'center' as const,
      render: (value: number) => <span className="font-medium">{value}</span>,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-primary-900">{project.name}</h1>
            <div className="flex items-center gap-2 text-slate-600 mt-2">
              <MapPin className="w-4 h-4" />
              <span>
                {project.location.city}, {project.location.country}
              </span>
            </div>
          </div>
        </div>
        <Button variant="primary" size="lg" className="flex items-center gap-2" onClick={() => router.push(`/investor/invest/${projectId}`)}>
          <Plus className="w-5 h-5" />
          Invertir Ahora
        </Button>
      </div>

      {/* Project Image */}
      <div className="h-96 rounded-xl overflow-hidden border border-slate-200 shadow-lg">
        <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          label="Monto Total"
          value={formatCurrency(project.totalAmount, 'USD')}
          icon={<DollarSign className="w-6 h-6" />}
        />
        <MetricCard
          label="Monto Recaudado"
          value={formatCurrency(project.raisedAmount, 'USD')}
          trend={raisedPercentage >= 100 ? 'up' : raisedPercentage >= 50 ? 'neutral' : 'down'}
          trendValue={`${Math.round(raisedPercentage)}%`}
          icon={<TrendingUp className="w-6 h-6" />}
        />
        <MetricCard
          label="Inversores"
          value={project.investorsCount}
          icon={<Users className="w-6 h-6" />}
        />
        <MetricCard
          label="Score de Confianza"
          value={`${project.trust}%`}
          icon={<Shield className="w-6 h-6" />}
          valueColor="text-emerald-600"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Description */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-primary-900 mb-4">Descripción del Proyecto</h2>
            <p className="text-slate-700 leading-relaxed mb-4">{project.description}</p>
            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
              <div>
                <p className="text-xs text-slate-600 font-medium mb-1">Tipo de Proyecto</p>
                <p className="font-semibold text-primary-900 capitalize">{project.type}</p>
              </div>
              <div>
                <p className="text-xs text-slate-600 font-medium mb-1">Duración Estimada</p>
                <p className="font-semibold text-primary-900">{project.durationMonths} meses</p>
              </div>
            </div>
          </div>

          {/* Project Metrics */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-primary-900 mb-6">Métricas Financieras</h2>
            <div className="space-y-4">
              {/* Raised Amount Progress */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Recaudación de Capital</span>
                  <span className="text-sm font-bold text-primary-900">{Math.round(raisedPercentage)}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full ${getProgressColor(raisedPercentage)}`}
                    style={{ width: `${Math.min(raisedPercentage, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  {formatCurrency(project.raisedAmount, 'USD')} de {formatCurrency(project.totalAmount, 'USD')}
                </p>
              </div>

              {/* Project Progress */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Progreso de Ejecución</span>
                  <span className="text-sm font-bold text-primary-900">{project.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full ${getProgressColor(project.progress)}`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Returns */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-xs text-slate-600 font-medium mb-1">Retorno Mínimo</p>
                  <p className="text-lg font-bold text-emerald-600">{formatPercentage(project.estimatedReturn.min)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 font-medium mb-1">Retorno Máximo</p>
                  <p className="text-lg font-bold text-emerald-600">{formatPercentage(project.estimatedReturn.max)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Token Information */}
          {token && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-xl font-bold text-primary-900 mb-4">Información del Token</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-600 font-medium mb-1">Nombre del Token</p>
                  <p className="text-lg font-semibold text-primary-900">{token.name}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 font-medium mb-1">Símbolo</p>
                  <p className="text-lg font-semibold text-primary-900">{token.symbol}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg mb-4">
                <div>
                  <p className="text-xs text-slate-600 font-medium mb-1">Suministro Total</p>
                  <p className="font-semibold text-primary-900">{token.totalSupply.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 font-medium mb-1">En Circulación</p>
                  <p className="font-semibold text-primary-900">{token.circulatingSupply.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 font-medium mb-1">Precio por Token</p>
                  <p className="font-semibold text-primary-900">{formatCurrency(token.priceUSD, 'USD')}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 font-medium mb-1">Holders</p>
                  <p className="font-semibold text-primary-900">{token.holders.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}

          {/* Investment History */}
          {investmentHistory.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-xl font-bold text-primary-900 mb-4">Historial de Inversiones</h2>
              <div className="overflow-x-auto">
                <Table
                  columns={investmentHistoryColumns}
                  data={investmentHistory}
                  rowKey="id"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-4">
          {/* Status Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-primary-900 mb-4">Estado del Proyecto</h3>
            <div className="space-y-3">
              <Badge status={project.status} />
              <div className="pt-2 border-t border-slate-200">
                <p className="text-xs text-slate-600 font-medium mb-2">Última Actualización</p>
                <p className="text-sm text-primary-900">{formatDate(project.lastUpdate)}</p>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <p className="text-xs text-slate-600 font-medium mb-2">Inversión Mínima</p>
                <p className="text-sm font-semibold text-primary-900">{formatCurrency(project.minInvestment, 'USD')}</p>
              </div>
            </div>
          </div>

          {/* Risk and Trust */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-primary-900 mb-4">Riesgo y Seguridad</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-600 font-medium mb-2">Nivel de Riesgo</p>
                <Badge status={project.riskLevel} />
              </div>
              <div className="pt-2 border-t border-slate-200">
                <p className="text-xs text-slate-600 font-medium mb-2">Score de Confianza</p>
                <div className="flex items-end gap-2">
                  <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-emerald-500"
                      style={{ width: `${project.trust}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-primary-900">{project.trust}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Available Tokens */}
          <div className="bg-cyan-50 rounded-xl border border-cyan-200 p-6">
            <h3 className="font-bold text-primary-900 mb-4">Disponibilidad de Tokens</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-600 font-medium mb-1">Tokens Disponibles</p>
                <p className="text-2xl font-bold text-cyan-700">{project.tokensAvailable.toLocaleString()}</p>
              </div>
              <div className="pt-2 border-t border-cyan-200">
                <p className="text-xs text-slate-600 font-medium mb-1">Total del Proyecto</p>
                <p className="text-sm text-primary-900 font-semibold">{project.tokensTotal.toLocaleString()} tokens</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-2">
            <Button
              variant="primary"
              className="w-full flex items-center justify-center gap-2 h-12"
              onClick={() => router.push(`/investor/invest/${projectId}`)}
            >
              <Plus className="w-5 h-5" />
              Invertir Ahora
            </Button>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Descargar Documentos
            </Button>
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => router.push('/investor/projects')}
            >
              Ver Otros Proyectos
            </Button>
          </div>

          {/* Additional Info */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
            <h4 className="font-semibold text-primary-900 mb-3 text-sm">Información Importante</h4>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex gap-2">
                <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <span>Inversión mínima de {formatCurrency(project.minInvestment, 'USD')}</span>
              </div>
              <div className="flex gap-2">
                <Shield className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <span>Proyecto auditado y asegurado</span>
              </div>
              <div className="flex gap-2">
                <Users className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <span>{project.investorsCount.toLocaleString()} inversores</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-6">
          <h3 className="font-bold text-primary-900 mb-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-600" />
            Objetivo
          </h3>
          <p className="text-sm text-slate-700">
            Recaudar {formatCurrency(project.totalAmount, 'USD')} para financiar este proyecto inmobiliario de alta rentabilidad.
          </p>
        </div>

        <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
          <h3 className="font-bold text-primary-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Rentabilidad
          </h3>
          <p className="text-sm text-slate-700">
            Retorno estimado entre {formatPercentage(project.estimatedReturn.min)} y {formatPercentage(project.estimatedReturn.max)} anual.
          </p>
        </div>

        <div className="bg-purple-50 rounded-xl border border-purple-200 p-6">
          <h3 className="font-bold text-primary-900 mb-3 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            Plazo
          </h3>
          <p className="text-sm text-slate-700">
            Duración estimada del proyecto: {project.durationMonths} meses.
          </p>
        </div>
      </div>
    </div>
  );
}
