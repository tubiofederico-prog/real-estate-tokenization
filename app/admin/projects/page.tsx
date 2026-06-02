'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Table } from '@/components/common/Table';
import { Plus, Edit2 } from 'lucide-react';
import { projects } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';

export default function ProjectsManagement() {
  const router = useRouter();

  const columns = [
    {
      key: 'name',
      label: 'Proyecto',
      render: (value: string, row: any) => (
        <div>
          <p className="font-semibold text-primary-900">{value}</p>
          <p className="text-xs text-slate-600">{row.location.city}</p>
        </div>
      ),
    },
    { key: 'type', label: 'Tipo', render: (value: string) => <span className="capitalize">{value}</span> },
    {
      key: 'totalAmount',
      label: 'Monto',
      align: 'right',
      render: (value: number) => <span className="font-bold">{formatCurrency(value, 'USD')}</span>,
    },
    {
      key: 'raisedAmount',
      label: 'Recaudado',
      align: 'right',
      render: (value: number, row: any) => (
        <div>
          <p className="font-bold text-primary-900">{formatCurrency(value, 'USD')}</p>
          <p className="text-xs text-slate-600">{Math.round((value / row.totalAmount) * 100)}%</p>
        </div>
      ),
    },
    {
      key: 'investorsCount',
      label: 'Inversores',
      align: 'center',
      render: (value: number) => <span className="font-bold">{value}</span>,
    },
    {
      key: 'status',
      label: 'Estado',
      render: (value: string) => <Badge status={value} />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">Gestión de Proyectos</h1>
          <p className="text-slate-600 mt-2">{projects.length} proyectos totales</p>
        </div>
        <Button variant="primary" size="lg">
          <Plus className="w-5 h-5 mr-2" />
          Crear Nuevo Proyecto
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <Table columns={columns} data={projects} rowKey="id" />
      </div>
    </div>
  );
}
