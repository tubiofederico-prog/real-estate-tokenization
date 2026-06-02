'use client';
import { MetricCard } from '@/components/common/MetricCard';
import { PortfolioChart } from '@/components/charts/PortfolioChart';
import { ReturnsChart } from '@/components/charts/ReturnsChart';
import { DistributionChart } from '@/components/charts/DistributionChart';
import { TrendingUp, Users, Building2, Zap } from 'lucide-react';
import { dashboardMetrics, getMonthlyReturnsData, getPortfolioDistribution } from '@/lib/mockData';
import { formatCurrency, formatNumber, formatCompact } from '@/lib/utils';

export default function MetricsPage() {
  const monthlyReturns = getMonthlyReturnsData();
  const portfolioDistribution = getPortfolioDistribution();

  const capitalizationRatio = (dashboardMetrics.transactionVolume / dashboardMetrics.totalCapitalTokenized) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary-900">Dashboard de Métricas Ejecutivas</h1>
        <p className="text-slate-600 mt-2">Análisis completo del desempeño de la plataforma</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Capital Tokenizado"
          value={formatCurrency(dashboardMetrics.totalCapitalTokenized, 'USD')}
          valueColor="text-primary-900"
          icon={<Building2 className="w-6 h-6 text-primary-600" />}
          trend="up"
          trendValue="+8.5% vs mes anterior"
        />
        <MetricCard
          label="Proyectos Activos"
          value={dashboardMetrics.activeProjects}
          valueColor="text-emerald-700"
          icon={<Building2 className="w-6 h-6 text-emerald-600" />}
        />
        <MetricCard
          label="Inversores Registrados"
          value={dashboardMetrics.registeredInvestors.toLocaleString()}
          valueColor="text-cyan-700"
          icon={<Users className="w-6 h-6 text-cyan-600" />}
          trend="up"
          trendValue="+12% este mes"
        />
        <MetricCard
          label="Retorno Promedio"
          value={`${dashboardMetrics.averageReturn}%`}
          valueColor="text-yellow-700"
          icon={<TrendingUp className="w-6 h-6 text-yellow-600" />}
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          label="Tokens Emitidos"
          value={formatCompact(dashboardMetrics.tokensEmitted)}
          unit="tokens"
          valueColor="text-primary-900"
          icon={<Zap className="w-6 h-6 text-primary-600" />}
        />
        <MetricCard
          label="Volumen de Transacciones"
          value={formatCurrency(dashboardMetrics.transactionVolume, 'USD')}
          valueColor="text-primary-900"
          trend="up"
          trendValue="+15.2% YoY"
        />
        <MetricCard
          label="Ratio de Capitalización"
          value={capitalizationRatio.toFixed(1)}
          unit="%"
          valueColor="text-slate-700"
          trendValue="Saludable"
          trend="neutral"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Returns Chart */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-xl font-bold text-primary-900 mb-4">Retornos Mensuales</h2>
          <ReturnsChart data={monthlyReturns} height={300} />
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-600 mb-1">Promedio Mensual</p>
                <p className="font-bold text-primary-900">
                  {formatCurrency(
                    monthlyReturns.reduce((sum, m) => sum + m.amount, 0) / monthlyReturns.length,
                    'USD'
                  )}
                </p>
              </div>
              <div>
                <p className="text-slate-600 mb-1">Total 6 Meses</p>
                <p className="font-bold text-emerald-700">
                  {formatCurrency(
                    monthlyReturns.reduce((sum, m) => sum + m.amount, 0),
                    'USD'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Distribution Chart */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-xl font-bold text-primary-900 mb-4">Distribución de Cartera</h2>
          <DistributionChart data={portfolioDistribution} height={300} />
          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-sm text-slate-600 mb-3 font-medium">Top Proyectos por Peso</p>
            <div className="space-y-2 text-sm">
              {portfolioDistribution.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-slate-700">{item.name}</span>
                  <span className="font-bold text-primary-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Statistics */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-xl font-bold text-primary-900 mb-4">Estadísticas de Plataforma</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-600">Tasa de Adopción de Usuarios</span>
                <span className="text-sm font-bold text-primary-900">78%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500" style={{ width: '78%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-600">Cobertura KYC</span>
                <span className="text-sm font-bold text-primary-900">92%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500" style={{ width: '92%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-600">Proyectos Completados</span>
                <span className="text-sm font-bold text-primary-900">2 de 6</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-500" style={{ width: '33%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-600">Participación de Mercado</span>
                <span className="text-sm font-bold text-primary-900">15.3%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: '15.3%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Growth Metrics */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-xl font-bold text-primary-900 mb-4">Crecimiento y Tendencias</h2>
          <div className="space-y-4">
            <div className="flex items-start justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <div>
                <p className="font-semibold text-emerald-900">Capital Recaudado YTD</p>
                <p className="text-xs text-emerald-700 mt-1">vs año anterior</p>
              </div>
              <span className="text-xl font-bold text-emerald-700">+45%</span>
            </div>

            <div className="flex items-start justify-between p-3 bg-cyan-50 rounded-lg border border-cyan-200">
              <div>
                <p className="font-semibold text-cyan-900">Nuevos Inversores</p>
                <p className="text-xs text-cyan-700 mt-1">Este trimestre</p>
              </div>
              <span className="text-xl font-bold text-cyan-700">+428</span>
            </div>

            <div className="flex items-start justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <p className="font-semibold text-blue-900">Valor Promedio por Inversor</p>
                <p className="text-xs text-blue-700 mt-1">Cartera</p>
              </div>
              <span className="text-xl font-bold text-blue-700">{formatCurrency(dashboardMetrics.totalCapitalTokenized / dashboardMetrics.registeredInvestors, 'USD')}</span>
            </div>

            <div className="flex items-start justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div>
                <p className="font-semibold text-yellow-900">Tasa de Retención</p>
                <p className="text-xs text-yellow-700 mt-1">Usuarios activos</p>
              </div>
              <span className="text-xl font-bold text-yellow-700">87%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Metrics */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-xl font-bold text-primary-900 mb-4">Métricas Avanzadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-slate-600 mb-2">Volatilidad de Precios</p>
            <p className="text-2xl font-bold text-primary-900">4.2%</p>
            <p className="text-xs text-slate-500 mt-1">30 días</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-2">Volumen Diario Promedio</p>
            <p className="text-2xl font-bold text-primary-900">{formatCurrency(dashboardMetrics.transactionVolume / 180, 'USD')}</p>
            <p className="text-xs text-slate-500 mt-1">Últimos 6 meses</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-2">Tasa de Conversión</p>
            <p className="text-2xl font-bold text-primary-900">18%</p>
            <p className="text-xs text-slate-500 mt-1">Visitantes a inversores</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-2">Score de Liquidez</p>
            <p className="text-2xl font-bold text-primary-900">8.7/10</p>
            <p className="text-xs text-slate-500 mt-1">Capacidad de venta</p>
          </div>
        </div>
      </div>
    </div>
  );
}
