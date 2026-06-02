'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { MetricCard } from '@/components/common/MetricCard';
import { Badge } from '@/components/common/Badge';
import { Table } from '@/components/common/Table';
import { DistributionChart } from '@/components/charts/DistributionChart';
import { TrendingUp, Plus, Search, Filter, Eye, Download } from 'lucide-react';
import { tokens, projects } from '@/lib/mockData';
import { formatCurrency, formatDate, formatNumber, formatCompact } from '@/lib/utils';

export default function TokenizationPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Calculate metrics
  const totalTokensEmitted = tokens.reduce((sum, t) => sum + t.totalSupply, 0);
  const totalCirculating = tokens.reduce((sum, t) => sum + t.circulatingSupply, 0);
  const averagePrice = tokens.length > 0 ? tokens.reduce((sum, t) => sum + t.priceUSD, 0) / tokens.length : 0;

  // Filter tokens
  const filteredTokens = tokens.filter((token) => {
    const matchesSearch = token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          token.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || token.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Table data
  const tableData = filteredTokens.map((token) => {
    const project = projects.find((p) => p.id === token.projectId);
    const marketCap = token.totalSupply * token.priceUSD;
    return {
      id: token.id,
      name: token.name,
      symbol: token.symbol,
      totalSupply: token.totalSupply,
      circulatingSupply: token.circulatingSupply,
      priceUSD: token.priceUSD,
      holders: token.holders,
      projectName: project?.name || 'N/A',
      status: token.status,
      marketCap,
      createdAt: token.createdAt,
      circulation: (token.circulatingSupply / token.totalSupply) * 100,
    };
  });

  const tableColumns = [
    {
      key: 'symbol',
      label: 'Token',
      render: (value: string, row: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm">
            {value[0]}
          </div>
          <div>
            <p className="font-semibold text-primary-900">{row.symbol}</p>
            <p className="text-xs text-slate-600">{row.name}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'projectName',
      label: 'Proyecto',
      render: (value: string) => (
        <button
          onClick={() => {
            const token = filteredTokens.find((t) => t.projectId === projects.find((p) => p.name === value)?.id);
            if (token) router.push(`/admin/tokenization/${token.id}`);
          }}
          className="font-medium text-primary-600 hover:text-primary-700 transition-colors"
        >
          {value}
        </button>
      ),
    },
    {
      key: 'totalSupply',
      label: 'Suministro Total',
      align: 'right' as const,
      render: (value: number) => <span className="font-semibold">{formatCompact(value)} tokens</span>,
    },
    {
      key: 'circulation',
      label: 'En Circulación',
      align: 'right' as const,
      render: (value: number) => (
        <div>
          <p className="font-semibold text-primary-900">{value.toFixed(1)}%</p>
          <p className="text-xs text-slate-600">{formatCompact(tableData.find((t) => t.circulation === value)?.circulatingSupply || 0)}</p>
        </div>
      ),
    },
    {
      key: 'priceUSD',
      label: 'Precio',
      align: 'right' as const,
      render: (value: number) => <span className="font-semibold text-cyan-700">{formatCurrency(value, 'USD')}</span>,
    },
    {
      key: 'marketCap',
      label: 'Market Cap',
      align: 'right' as const,
      render: (value: number) => (
        <span className="font-semibold text-emerald-700">{formatCompact(value)} USD</span>
      ),
    },
    {
      key: 'holders',
      label: 'Holders',
      align: 'right' as const,
      render: (value: number) => <span className="font-semibold text-primary-900">{formatNumber(value)}</span>,
    },
    {
      key: 'status',
      label: 'Estado',
      align: 'center' as const,
      render: (value: string) => <Badge status={value} />,
    },
    {
      key: 'id',
      label: 'Acciones',
      align: 'center' as const,
      render: (value: string) => (
        <button
          onClick={() => router.push(`/admin/tokenization/${value}`)}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Eye className="w-4 h-4 text-primary-600" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">Gestión de Tokenización</h1>
          <p className="text-slate-600 mt-2">Administra y monitorea todos los tokens de la plataforma</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="lg">
            <Download className="w-5 h-5 mr-2" />
            Exportar
          </Button>
          <Button variant="primary" size="lg" onClick={() => router.push('/admin/projects/new')}>
            <Plus className="w-5 h-5 mr-2" />
            Nuevo Token
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          label="Tokens Emitidos"
          value={formatCompact(totalTokensEmitted)}
          unit="tokens"
          trend="up"
          trendValue="+125K mes"
          icon={<TrendingUp className="w-6 h-6" />}
        />
        <MetricCard
          label="En Circulación"
          value={formatCompact(totalCirculating)}
          unit="tokens"
          trend="up"
          trendValue="+8.2%"
        />
        <MetricCard
          label="Precio Promedio"
          value={formatCurrency(averagePrice, 'USD')}
          trend="neutral"
          trendValue="Estable"
        />
        <MetricCard
          label="Total Tokenizado"
          value={formatCompact(totalTokensEmitted * averagePrice)}
          unit="USD"
          trend="up"
          trendValue="+12.5%"
        />
      </div>

      {/* Distribution Chart */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-xl font-bold text-primary-900 mb-6">Distribución de Tokens por Proyecto</h2>
        <DistributionChart />
      </div>

      {/* Filters and Search */}
      <div className="flex gap-4 items-end">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, símbolo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              statusFilter === 'all'
                ? 'bg-primary-100 text-primary-700 border border-primary-300'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setStatusFilter('active')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              statusFilter === 'active'
                ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Activos
          </button>
          <button
            onClick={() => setStatusFilter('paused')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              statusFilter === 'paused'
                ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Pausados
          </button>
        </div>
      </div>

      {/* Tokens Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <Table columns={tableColumns} data={tableData} />
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-sm font-medium text-slate-600 mb-4">Tokens Listados</h3>
          <p className="text-4xl font-bold text-primary-900">{tokens.length}</p>
          <p className="text-xs text-slate-500 mt-2">100% activos y operacionales</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-sm font-medium text-slate-600 mb-4">Total de Holders</h3>
          <p className="text-4xl font-bold text-cyan-700">{formatNumber(tokens.reduce((sum, t) => sum + t.holders, 0))}</p>
          <p className="text-xs text-slate-500 mt-2">Inversores únicos en tokens</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-sm font-medium text-slate-600 mb-4">Valor Total</h3>
          <p className="text-4xl font-bold text-emerald-700">{formatCompact(totalTokensEmitted * averagePrice)} USD</p>
          <p className="text-xs text-slate-500 mt-2">Capital tokenizado</p>
        </div>
      </div>
    </div>
  );
}
