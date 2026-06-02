'use client';
import { useParams } from 'next/navigation';
import { projects } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';

export default function InvestmentWizardPage() {
  const params = useParams();
  const projectId = params.id as string;
  const project = projects.find((p) => p.id === projectId);

  if (!project) return <div className="text-center py-12">Proyecto no encontrado</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary-900">Invertir en {project.name}</h1>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
        <p className="text-slate-600 mb-4">Wizard de inversión - Simulado</p>
        <p className="text-primary-900">Monto mínimo: {formatCurrency(project.minInvestment, 'USD')}</p>
        <p className="text-primary-900 mt-2">Monto total disponible: {formatCurrency(project.totalAmount - project.raisedAmount, 'USD')}</p>
      </div>
    </div>
  );
}
