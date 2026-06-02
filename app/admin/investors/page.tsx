'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Table } from '@/components/common/Table';
import { MetricCard } from '@/components/common/MetricCard';
import { Eye, Download, Filter, Search } from 'lucide-react';
import { investors } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';

export default function InvestorsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const totalInvested = investors.reduce((sum, inv) => sum + inv.totalInvested, 0);
  const activeInvestors = investors.filter((inv) => inv.status === 'active').length;
  const verifiedKYC = investors.filter((inv) => inv.kycStatus === 'verified').length;

  const filteredInvestors = investors.filter((inv) => {
    const matchesSearch =
      inv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || inv.kycStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const portfolioValue = investors.reduce((sum, inv) => {
    const portfolioSum = inv.totalInvested * 1.15; // estimated 15% return
    return sum + portfolioSum;
  }, 0);

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
      key: 'kycStatus',
      label: 'KYC',
      render: (value: string) => <Badge status={value} />,
    },
    {
      key: 'totalInvested',
      label: 'Invertido',
      align: 'right' as const,
      render: (value: number) => <span className="font-bold">{formatCurrency(value, 'USD')}</span>,
    },
    {
      key: 'status',
      label: 'Estado',
      render: (value: string) => <Badge status={value} />,
    },
    {
      key: 'id',
      label: 'Acciones',
      align: 'center' as const,
      render: (value: string) => (
        <div className="flex items-center gap-2 justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/admin/investors/${value}`)}
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">Gestión de Inversores</h1>
          <p className="text-slate-600 mt-2">{investors.length} inversores totales</p>
        </div>
        <Button variant="secondary" size="lg">
          <Download className="w-5 h-5 mr-2" />
          Exportar
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Inversores Activos"
          value={activeInvestors}
          valueColor="text-emerald-700"
          trendValue={`${((activeInvestors / investors.length) * 100).toFixed(0)}% del total`}
          trend="neutral"
        />
        <MetricCard
          label="Capital Total Invertido"
          value={formatCurrency(totalInvested, 'USD')}
          valueColor="text-primary-900"
        />
        <MetricCard
          label="Valor de Portafolio"
          value={formatCurrency(portfolioValue, 'USD')}
          trend="up"
          trendValue="+15% estimado"
        />
        <MetricCard
          label="KYC Verificados"
          value={verifiedKYC}
          valueColor="text-cyan-700"
          trendValue={`${((verifiedKYC / investors.length) * 100).toFixed(0)}% completado`}
          trend="neutral"
        />
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-primary-600"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterStatus || ''}
            onChange={(e) => setFilterStatus(e.target.value || null)}
            className="px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-primary-600"
          >
            <option value="">Todos los KYC</option>
            <option value="verified">Verificados</option>
            <option value="pending">Pendientes</option>
            <option value="rejected">Rechazados</option>
          </select>
          <Button variant="outline">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <Table columns={columns} data={filteredInvestors} rowKey="id" />
      </div>
    </div>
  );
}
