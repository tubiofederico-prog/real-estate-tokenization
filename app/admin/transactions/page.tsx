'use client';
import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { MetricCard } from '@/components/common/MetricCard';
import { Table } from '@/components/common/Table';
import { Download, Search, Filter, TrendingUp, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { transactions } from '@/lib/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);

  const investments = transactions.filter((t) => t.type === 'investment');
  const dividends = transactions.filter((t) => t.type === 'dividend');
  const deposits = transactions.filter((t) => t.type === 'deposit');
  const withdrawals = transactions.filter((t) => t.type === 'withdrawal');

  const totalInvested = investments.reduce((sum, t) => sum + t.amount, 0);
  const totalDividends = dividends.reduce((sum, t) => sum + t.amount, 0);
  const totalWithdrawals = withdrawals.reduce((sum, t) => sum + t.amount, 0);
  const netFlow = totalInvested + deposits.reduce((sum, t) => sum + t.amount, 0) - totalWithdrawals;

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.investorId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.projectId && t.projectId.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = !filterType || t.type === filterType;
    return matchesSearch && matchesType;
  });

  const columns: any[] = [
    {
      key: 'date',
      label: 'Fecha',
      render: (value: string) => formatDate(value),
    },
    {
      key: 'investorId',
      label: 'Inversor',
      render: (value: string) => <span className="font-medium">{value}</span>,
    },
    {
      key: 'type',
      label: 'Tipo',
      render: (value: string) => {
        const colors: Record<string, string> = {
          investment: 'bg-emerald-100 text-emerald-700',
          dividend: 'bg-blue-100 text-blue-700',
          deposit: 'bg-cyan-100 text-cyan-700',
          withdrawal: 'bg-orange-100 text-orange-700',
          token_conversion: 'bg-purple-100 text-purple-700',
        };
        return (
          <span className={`capitalize px-2 py-1 rounded-lg text-xs font-medium ${colors[value] || 'bg-slate-100 text-slate-700'}`}>
            {value}
          </span>
        );
      },
    },
    {
      key: 'description',
      label: 'Descripción',
    },
    {
      key: 'amount',
      label: 'Monto',
      align: 'right' as const,
      render: (value: number, row: any) => (
        <div className="flex items-center gap-2 justify-end">
          {['investment', 'deposit', 'dividend'].includes(row.type) ? (
            <ArrowDownLeft className="w-4 h-4 text-emerald-600" />
          ) : (
            <ArrowUpRight className="w-4 h-4 text-red-600" />
          )}
          <span className="font-bold">{formatCurrency(value, 'USD')}</span>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Estado',
      render: (value: string) => <Badge status={value} />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">Historial de Transacciones</h1>
          <p className="text-slate-600 mt-2">{transactions.length} transacciones registradas</p>
        </div>
        <Button variant="secondary">
          <Download className="w-5 h-5 mr-2" />
          Exportar CSV
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Invertido"
          value={formatCurrency(totalInvested, 'USD')}
          valueColor="text-emerald-700"
          icon={<TrendingUp className="w-6 h-6 text-emerald-600" />}
        />
        <MetricCard
          label="Dividendos Pagados"
          value={formatCurrency(totalDividends, 'USD')}
          valueColor="text-cyan-700"
          trend="up"
          trendValue={`${((totalDividends / totalInvested) * 100).toFixed(1)}% de inversión`}
        />
        <MetricCard
          label="Total Retirado"
          value={formatCurrency(totalWithdrawals, 'USD')}
          valueColor="text-orange-700"
        />
        <MetricCard
          label="Flujo Neto"
          value={formatCurrency(netFlow, 'USD')}
          valueColor={netFlow > 0 ? 'text-emerald-700' : 'text-red-700'}
          trend={netFlow > 0 ? 'up' : 'down'}
          trendValue={`${netFlow > 0 ? '+' : ''}${Math.abs((netFlow / (totalInvested + deposits.reduce((s, t) => s + t.amount, 0))) * 100).toFixed(1)}%`}
        />
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por inversor, descripción o proyecto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-primary-600"
          />
        </div>
        <select
          value={filterType || ''}
          onChange={(e) => setFilterType(e.target.value || null)}
          className="px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-primary-600"
        >
          <option value="">Todos los Tipos</option>
          <option value="investment">Inversiones</option>
          <option value="dividend">Dividendos</option>
          <option value="deposit">Depósitos</option>
          <option value="withdrawal">Retiros</option>
        </select>
        <Button variant="outline">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Statistics Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
          <p className="text-sm text-emerald-700 font-medium">Inversiones</p>
          <p className="text-2xl font-bold text-emerald-900 mt-2">{investments.length}</p>
          <p className="text-xs text-emerald-600 mt-1">{formatCurrency(totalInvested, 'USD')}</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700 font-medium">Dividendos</p>
          <p className="text-2xl font-bold text-blue-900 mt-2">{dividends.length}</p>
          <p className="text-xs text-blue-600 mt-1">{formatCurrency(totalDividends, 'USD')}</p>
        </div>
        <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
          <p className="text-sm text-cyan-700 font-medium">Depósitos</p>
          <p className="text-2xl font-bold text-cyan-900 mt-2">{deposits.length}</p>
          <p className="text-xs text-cyan-600 mt-1">{formatCurrency(deposits.reduce((s, t) => s + t.amount, 0), 'USD')}</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <p className="text-sm text-orange-700 font-medium">Retiros</p>
          <p className="text-2xl font-bold text-orange-900 mt-2">{withdrawals.length}</p>
          <p className="text-xs text-orange-600 mt-1">{formatCurrency(totalWithdrawals, 'USD')}</p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <Table columns={columns} data={filteredTransactions} rowKey="id" />
      </div>

      {/* Transaction Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-bold text-primary-900 mb-4">Flujo de Caja</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center p-2 bg-emerald-50 rounded">
              <span className="text-emerald-700 font-medium">Entradas</span>
              <span className="font-bold text-emerald-900">
                {formatCurrency(totalInvested + deposits.reduce((s, t) => s + t.amount, 0) + totalDividends, 'USD')}
              </span>
            </div>
            <div className="flex justify-between items-center p-2 bg-red-50 rounded">
              <span className="text-red-700 font-medium">Salidas</span>
              <span className="font-bold text-red-900">{formatCurrency(totalWithdrawals, 'USD')}</span>
            </div>
            <div className="flex justify-between items-center p-2 border-t border-slate-200 pt-3 font-semibold">
              <span className="text-primary-900">Neto</span>
              <span className={netFlow > 0 ? 'text-emerald-700' : 'text-red-700'}>{formatCurrency(netFlow, 'USD')}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-bold text-primary-900 mb-4">Transacciones por Tipo</h3>
          <div className="space-y-3 text-sm">
            {[
              { label: 'Inversiones', count: investments.length, color: 'bg-emerald-100 text-emerald-700' },
              { label: 'Dividendos', count: dividends.length, color: 'bg-blue-100 text-blue-700' },
              { label: 'Depósitos', count: deposits.length, color: 'bg-cyan-100 text-cyan-700' },
              { label: 'Retiros', count: withdrawals.length, color: 'bg-orange-100 text-orange-700' },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center">
                <span className="text-slate-600">{item.label}</span>
                <span className={`px-2 py-1 rounded font-bold text-xs ${item.color}`}>
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-bold text-primary-900 mb-4">Estadísticas</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-slate-600 mb-1">Transacción Promedio</p>
              <p className="font-bold text-primary-900">
                {formatCurrency(
                  transactions.reduce((s, t) => s + t.amount, 0) / transactions.length,
                  'USD'
                )}
              </p>
            </div>
            <div>
              <p className="text-slate-600 mb-1">Transacción Mayor</p>
              <p className="font-bold text-primary-900">
                {formatCurrency(Math.max(...transactions.map((t) => t.amount)), 'USD')}
              </p>
            </div>
            <div>
              <p className="text-slate-600 mb-1">Tasa de Éxito</p>
              <p className="font-bold text-emerald-700">
                {((transactions.filter((t) => t.status === 'completed').length / transactions.length) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
