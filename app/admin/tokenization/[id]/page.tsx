'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { MetricCard } from '@/components/common/MetricCard';
import { ArrowLeft, TrendingUp, Copy, Download } from 'lucide-react';
import { tokens, projects, portfolios } from '@/lib/mockData';
import { formatCurrency, formatNumber, formatCompact, formatDate } from '@/lib/utils';

export default function TokenDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const token = tokens.find((t) => t.id === params.id);
  const project = token ? projects.find((p) => p.id === token.projectId) : null;
  const tokenHolders = portfolios.filter((p) => token && p.projectId === token.projectId);

  if (!token || !project) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Atrás
          </Button>
        </div>
        <div className="text-center py-12">
          <p className="text-slate-600">Token no encontrado</p>
        </div>
      </div>
    );
  }

  const marketCap = token.totalSupply * token.priceUSD;
  const circulatingCap = token.circulatingSupply * token.priceUSD;
  const holdersPercentage = (token.holders / project.investorsCount) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-primary-900">{token.name}</h1>
              <span className="px-3 py-1 rounded-lg bg-cyan-100 text-cyan-700 font-bold text-lg">
                {token.symbol}
              </span>
            </div>
            <p className="text-slate-600 mt-1">Proyecto: {project.name}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Copy className="w-4 h-4 mr-2" />
            Copiar Contrato
          </Button>
          <Button variant="secondary">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Precio USD"
          value={formatCurrency(token.priceUSD, 'USD')}
          valueColor="text-primary-900"
        />
        <MetricCard
          label="Market Cap"
          value={formatCompact(marketCap)}
          unit="USD"
          valueColor="text-primary-900"
        />
        <MetricCard
          label="Holders"
          value={token.holders.toLocaleString()}
          valueColor="text-cyan-700"
        />
        <MetricCard
          label="Suministro Circulante"
          value={formatCompact(token.circulatingSupply)}
          unit="tokens"
          valueColor="text-emerald-700"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Token Information */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-primary-900 mb-4">Información del Token</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-slate-600 mb-1">Nombre</p>
                <p className="font-semibold text-primary-900">{token.name}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Símbolo</p>
                <p className="font-semibold text-primary-900 text-lg">{token.symbol}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Estado</p>
                <span className="inline-block px-3 py-1 rounded-lg bg-emerald-100 text-emerald-700 font-medium text-sm">
                  {token.status.charAt(0).toUpperCase() + token.status.slice(1)}
                </span>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Suministro Total</p>
                <p className="font-semibold text-primary-900">{formatNumber(token.totalSupply, 0)}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Suministro en Circulación</p>
                <p className="font-semibold text-primary-900">{formatNumber(token.circulatingSupply, 0)}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Porcentaje Circulante</p>
                <p className="font-semibold text-primary-900">
                  {((token.circulatingSupply / token.totalSupply) * 100).toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Fecha de Creación</p>
                <p className="font-semibold text-primary-900">{formatDate(token.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Holders Únicos</p>
                <p className="font-semibold text-primary-900">{token.holders.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Precio USD</p>
                <p className="font-semibold text-primary-900">{formatCurrency(token.priceUSD, 'USD')}</p>
              </div>
            </div>
          </div>

          {/* Market Data */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Datos de Mercado
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-slate-600 mb-3">Market Cap (Total)</p>
                <p className="text-3xl font-bold text-primary-900">{formatCurrency(marketCap, 'USD')}</p>
                <p className="text-xs text-slate-500 mt-1">Basado en suministro total</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-3">Market Cap (Circulante)</p>
                <p className="text-3xl font-bold text-cyan-700">{formatCurrency(circulatingCap, 'USD')}</p>
                <p className="text-xs text-slate-500 mt-1">Basado en suministro en circulación</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-3">Tokens Disponibles</p>
                <p className="text-2xl font-bold text-emerald-700">{formatNumber(project.tokensAvailable, 0)}</p>
                <p className="text-xs text-slate-500 mt-1">{((project.tokensAvailable / token.totalSupply) * 100).toFixed(1)}% del total</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-3">Valor por Inversión</p>
                <p className="text-2xl font-bold text-primary-900">{formatCurrency(project.pricePerToken, 'USD')}</p>
                <p className="text-xs text-slate-500 mt-1">Por token</p>
              </div>
            </div>
          </div>

          {/* Distribution */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-primary-900 mb-4">Distribución de Holders</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-600">Holders en este Proyecto</span>
                  <span className="text-sm font-bold text-primary-900">{token.holders}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                    style={{ width: `${Math.min(holdersPercentage, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">{holdersPercentage.toFixed(1)}% de inversores del proyecto</p>
              </div>
              <div className="pt-3 border-t border-slate-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Tokens por Holder (Promedio)</p>
                    <p className="font-semibold text-primary-900">
                      {(token.circulatingSupply / token.holders).toFixed(0)} tokens
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Inversión Mínima</p>
                    <p className="font-semibold text-primary-900">{formatCurrency(project.minInvestment, 'USD')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-4">
          {/* Contract Info */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-primary-900 mb-4">Información de Contrato</h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-xs text-slate-600 mb-2">Dirección del Contrato</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-2 py-1 bg-slate-100 rounded text-xs font-mono text-slate-700">
                    0x{token.symbol}...abc
                  </code>
                  <Button variant="ghost" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-1">Red</p>
                <p className="font-semibold text-primary-900">Ethereum Mainnet</p>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-1">Tipo de Token</p>
                <p className="font-semibold text-primary-900">ERC-20</p>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-1">Decimales</p>
                <p className="font-semibold text-primary-900">18</p>
              </div>
            </div>
          </div>

          {/* Supply Breakdown */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-primary-900 mb-4">Desglose de Suministro</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">En Circulación</span>
                <span className="font-bold text-primary-900">
                  {formatCompact(token.circulatingSupply)} ({((token.circulatingSupply / token.totalSupply) * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Disponible</span>
                <span className="font-bold text-primary-900">
                  {formatCompact(token.totalSupply - token.circulatingSupply)} ({(((token.totalSupply - token.circulatingSupply) / token.totalSupply) * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="pt-3 border-t border-slate-200">
                <div className="flex justify-between items-center font-semibold">
                  <span className="text-primary-900">Total</span>
                  <span className="text-primary-900">{formatCompact(token.totalSupply)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Project Link */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-primary-900 mb-4">Proyecto Asociado</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-600 mb-1">Nombre</p>
                <p className="font-semibold text-primary-900 text-sm">{project.name}</p>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-1">Ubicación</p>
                <p className="font-semibold text-primary-900 text-sm">
                  {project.location.city}, {project.location.country}
                </p>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push(`/admin/projects/${project.id}`)}
              >
                Ver Proyecto
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <Button variant="secondary" className="w-full">
              Actualizar Precio
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
