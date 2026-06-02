'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { MetricCard } from '@/components/common/MetricCard';
import { Badge } from '@/components/common/Badge';
import { PortfolioChart } from '@/components/charts/PortfolioChart';
import { DistributionChart } from '@/components/charts/DistributionChart';
import { ReturnsChart } from '@/components/charts/ReturnsChart';
import { TrendingUp, Wallet, PieChart, ArrowRight, Plus } from 'lucide-react';
import { dashboardMetrics, portfolios, transactions } from '@/lib/mockData';
import { formatCurrency, formatPercentage } from '@/lib/utils';

export default function InvestorDashboard() {
  const router = useRouter();

  const investorData = {
    totalInvested: portfolios.reduce((sum, p) => sum + p.investmentAmount, 0),
    currentValue: portfolios.reduce((sum, p) => sum + p.currentValue, 0),
    totalReturns: 285000,
    walletBalance: 45000,
    tokensHeld: 12450,
  };

  const recentTransactions = transactions.slice(0, 5);
  const returnPercentage = ((investorData.currentValue - investorData.totalInvested) / investorData.totalInvested) * 100;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary-900">Mi Dashboard</h1>
        <p className="text-slate-600 mt-2">Bienvenido de vuelta, inversionista premium</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          label="Cartera Total"
          value={formatCurrency(investorData.currentValue, 'USD')}
          trend="up"
          trendValue={`+${formatPercentage(returnPercentage)}`}
          icon={<TrendingUp className="w-6 h-6" />}
        />
        <MetricCard
          label="Invertido"
          value={formatCurrency(investorData.totalInvested, 'USD')}
          trend="neutral"
          trendValue={`${portfolios.length} proyectos`}
        />
        <MetricCard
          label="Ganancias"
          value={formatCurrency(investorData.totalReturns, 'USD')}
          trend="up"
          trendValue="+12.4% anual"
          valueColor="text-emerald-600"
        />
        <MetricCard
          label="Saldo Disponible"
          value={formatCurrency(investorData.walletBalance, 'USD')}
          icon={<Wallet className="w-6 h-6" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PortfolioChart />
        </div>
        <DistributionChart />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-xl font-bold text-primary-900 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button variant="primary" size="lg" className="w-full flex items-center justify-center gap-2" onClick={() => router.push('/investor/projects')}>
            <Plus className="w-5 h-5" />
            Invertir
          </Button>
          <Button variant="outline" size="lg" className="w-full flex items-center justify-center gap-2" onClick={() => router.push('/investor/portfolio')}>
            <PieChart className="w-5 h-5" />
            Cartera
          </Button>
          <Button variant="outline" size="lg" className="w-full flex items-center justify-center gap-2" onClick={() => router.push('/investor/wallet')}>
            <Wallet className="w-5 h-5" />
            Wallet
          </Button>
          <Button variant="outline" size="lg" className="w-full flex items-center justify-center gap-2" onClick={() => router.push('/investor/reports')}>
            <TrendingUp className="w-5 h-5" />
            Reportes
          </Button>
        </div>
      </div>

      <ReturnsChart />

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-primary-900">Actividad Reciente</h2>
          <Button variant="ghost" size="sm">
            Ver Todo <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="space-y-3">
          {recentTransactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex-1">
                <p className="font-medium text-primary-900">{tx.description}</p>
                <p className="text-sm text-slate-600">{tx.date}</p>
              </div>
              <div className="text-right">
                <p className={`font-bold ${tx.type === 'dividend' || tx.type === 'deposit' ? 'text-emerald-600' : 'text-primary-900'}`}>
                  {tx.type === 'dividend' || tx.type === 'deposit' ? '+' : ''}{formatCurrency(tx.amount, 'USD')}
                </p>
                <Badge status={tx.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
