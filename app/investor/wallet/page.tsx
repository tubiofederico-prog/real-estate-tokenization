'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { MetricCard } from '@/components/common/MetricCard';
import { Badge } from '@/components/common/Badge';
import { Table } from '@/components/common/Table';
import { ArrowDown, ArrowUp, Eye, EyeOff, Plus } from 'lucide-react';
import { transactions, portfolios } from '@/lib/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function WalletPage() {
  const router = useRouter();
  const [showBalance, setShowBalance] = useState(true);

  const investorTransactions = transactions;
  const investorPortfolios = portfolios;

  // Calculate wallet metrics
  const totalInvested = investorPortfolios.reduce((sum, p) => sum + p.investmentAmount, 0);
  const currentValue = investorPortfolios.reduce((sum, p) => sum + p.currentValue, 0);
  const totalReturns = currentValue - totalInvested;
  const availableBalance = 45000;
  const totalPortfolio = currentValue + availableBalance;

  const dividends = investorTransactions.filter((t) => t.type === 'dividend').reduce((sum, t) => sum + t.amount, 0);
  const deposits = investorTransactions.filter((t) => t.type === 'deposit').reduce((sum, t) => sum + t.amount, 0);
  const withdrawals = investorTransactions.filter((t) => t.type === 'withdrawal').reduce((sum, t) => sum + t.amount, 0);

  const tableColumns = [
    {
      key: 'date',
      label: 'Fecha',
      render: (value: string) => formatDate(value),
    },
    {
      key: 'type',
      label: 'Tipo',
      render: (value: string) => <Badge status={value} />,
    },
    {
      key: 'description',
      label: 'Descripción',
      render: (value: string) => <span className="text-sm">{value}</span>,
    },
    {
      key: 'amount',
      label: 'Monto',
      align: 'right' as const,
      render: (value: number, row: any) => (
        <span className={row.type === 'dividend' || row.type === 'deposit' ? 'text-emerald-600 font-bold' : 'font-bold'}>
          {row.type === 'dividend' || row.type === 'deposit' ? '+' : '-'}{formatCurrency(value, 'USD')}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Estado',
      render: (value: string) => <Badge status={value} />,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary-900">Mi Wallet</h1>
        <p className="text-slate-600 mt-2">Gestiona tu saldo y visualiza tu historial de transacciones</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-600 font-medium">Saldo Disponible</p>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-2xl font-bold text-primary-900 mb-1">
            {showBalance ? formatCurrency(availableBalance, 'USD') : '••••••'}
          </p>
          <p className="text-xs text-slate-500">Listo para invertir</p>
        </div>

        <MetricCard
          label="Cartera Total"
          value={formatCurrency(totalPortfolio, 'USD')}
          trend="up"
          trendValue={`+${formatCurrency(totalReturns, 'USD')}`}
          valueColor="text-emerald-600"
        />

        <MetricCard
          label="Invertido"
          value={formatCurrency(totalInvested, 'USD')}
          trendValue={`${investorPortfolios.length} activos`}
        />

        <MetricCard
          label="Ganancias Totales"
          value={formatCurrency(totalReturns, 'USD')}
          trend="up"
          trendValue="+12.4% anual"
          valueColor="text-emerald-600"
        />
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="primary" className="w-full flex items-center justify-center gap-2 h-12">
          <ArrowDown className="w-5 h-5" />
          Depositar Fondos
        </Button>
        <Button variant="outline" className="w-full flex items-center justify-center gap-2 h-12">
          <ArrowUp className="w-5 h-5" />
          Retirar Ganancias
        </Button>
        <Button variant="secondary" className="w-full flex items-center justify-center gap-2 h-12">
          <Plus className="w-5 h-5" />
          Nueva Inversión
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-xl border border-emerald-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-slate-600 font-medium mb-1">Dividendos Recibidos</p>
              <p className="text-2xl font-bold text-emerald-700">{formatCurrency(dividends, 'USD')}</p>
            </div>
            <div className="p-3 bg-emerald-100 rounded-lg">
              <ArrowDown className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <p className="text-xs text-slate-600">Distribuciones de rentabilidad</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-slate-600 font-medium mb-1">Depósitos Totales</p>
              <p className="text-2xl font-bold text-blue-700">{formatCurrency(deposits, 'USD')}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-slate-600">Fondos agregados a tu cuenta</p>
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-slate-600 font-medium mb-1">Retiros Realizados</p>
              <p className="text-2xl font-bold text-slate-700">{formatCurrency(withdrawals, 'USD')}</p>
            </div>
            <div className="p-3 bg-slate-200 rounded-lg">
              <ArrowUp className="w-6 h-6 text-slate-600" />
            </div>
          </div>
          <p className="text-xs text-slate-600">Fondos retirados de tu wallet</p>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-primary-900">Historial de Transacciones</h2>
          <Button variant="ghost" size="sm">
            Descargar CSV
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table
            columns={tableColumns}
            data={investorTransactions}
            rowKey="id"
          />
        </div>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-primary-900 mb-4">Comisiones Aplicadas</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-700">Comisión de Inversión</span>
              <span className="font-semibold text-slate-900">1.5%</span>
            </div>
            <div className="flex items-center justify-between text-sm border-t border-slate-200 pt-3">
              <span className="text-slate-700">Comisión de Retiro</span>
              <span className="font-semibold text-slate-900">1.0%</span>
            </div>
            <div className="flex items-center justify-between text-sm border-t border-slate-200 pt-3">
              <span className="text-slate-700">Conversión de Tokens</span>
              <span className="font-semibold text-slate-900">0.5%</span>
            </div>
          </div>
        </div>

        <div className="bg-cyan-50 rounded-xl border border-cyan-200 p-6">
          <h3 className="text-lg font-bold text-primary-900 mb-4">Métodos de Pago</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-cyan-100">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-sm font-medium text-slate-700">Transferencia Bancaria</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-cyan-100">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm font-medium text-slate-700">Wallet Digital</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-cyan-100">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm font-medium text-slate-700">Criptomonedas (Beta)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
