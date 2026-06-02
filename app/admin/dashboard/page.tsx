'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { MetricCard } from '@/components/common/MetricCard';
import { Badge } from '@/components/common/Badge';
import { PortfolioChart } from '@/components/charts/PortfolioChart';
import { DistributionChart } from '@/components/charts/DistributionChart';
import { TrendingUp, Users, Building2, Zap, AlertCircle, Plus } from 'lucide-react';
import { dashboardMetrics, projects, investors } from '@/lib/mockData';
import { formatCurrency, formatCompact } from '@/lib/utils';

export default function AdminDashboard() {
  const router = useRouter();

  const pendingKYC = investors.filter((i) => i.kycStatus === 'pending').length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">Dashboard Administrativo</h1>
          <p className="text-slate-600 mt-2">Visión ejecutiva de la plataforma</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="lg" onClick={() => router.push('/admin/projects')}>
            <Plus className="w-5 h-5 mr-2" />
            Crear Proyecto
          </Button>
          <Button variant="primary" size="lg">
            Emitir Tokens
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Capital Tokenizado" value={formatCompact(dashboardMetrics.totalCapitalTokenized)} unit="USD" trend="up" trendValue="+8.2% mes" icon={<TrendingUp className="w-6 h-6" />} />
        <MetricCard label="Proyectos Activos" value={dashboardMetrics.activeProjects} trend="neutral" trendValue={`${pendingKYC} por publicar`} icon={<Building2 className="w-6 h-6" />} />
        <MetricCard label="Inversores" value={formatCompact(dashboardMetrics.registeredInvestors)} trend="up" trendValue="+12% mes" icon={<Users className="w-6 h-6" />} />
        <MetricCard label="Tokens Emitidos" value={formatCompact(dashboardMetrics.tokensEmitted)} trend="up" trendValue="+2.1M mes" icon={<Zap className="w-6 h-6" />} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-yellow-900 mb-2">KYC Pendientes</h3>
              <p className="text-sm text-yellow-800 mb-4">{pendingKYC} usuarios esperando verificación</p>
              <Button variant="outline" size="sm" onClick={() => router.push('/admin/kyc')}>
                Revisar KYC
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Building2 className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-blue-900 mb-2">Proyectos</h3>
              <p className="text-sm text-blue-800 mb-4">3 proyectos en pipeline listos para tokenizar</p>
              <Button variant="outline" size="sm" onClick={() => router.push('/admin/projects')}>
                Ver Proyectos
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PortfolioChart />
        </div>
        <DistributionChart />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-xl font-bold text-primary-900 mb-4">Últimos Proyectos</h2>
        <div className="space-y-3">
          {projects.slice(0, 5).map((project) => (
            <div key={project.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg hover:bg-slate-50">
              <div>
                <p className="font-semibold text-primary-900">{project.name}</p>
                <p className="text-sm text-slate-600">{project.location.city}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary-900">{formatCurrency(project.totalAmount, 'USD')}</p>
                <Badge status={project.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
